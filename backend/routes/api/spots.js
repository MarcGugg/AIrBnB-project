const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const {app} = require('../../app');

const {Spot} = require('../../db/models')
const {SpotImage} = require('../../db/models')
const {Review} = require('../../db/models')
const {requireAuth} = require('../../utils/auth');
// const review = require('../../db/models/review');
const {Booking} = require('../../db/models');
const {Op} = require('sequelize')

//spots owned by current user
router.get('/current', requireAuth, async (req, res, next) => {
    const {user} = req
    if (user) {
        let userSpots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        })

        if (!userSpots) {
            let err = new Error('user doesn\'t seem to have any spots')
            err.status = 400
            next(err)
            return
        }

        let Spots = []
        for (let spot of userSpots) {
            spotJSON = spot.toJSON()
            spotJSON['avgRating'] = await spot.avgRating()
            Spots.push(spotJSON)
        }
        
        for (let spot of Spots) {
            let previewImage = await SpotImage.findOne({
                where: {
                    spotId: spot.id
                    // preview: true
                }
            })

            // if (previewImage) {
                spot['previewImage'] = previewImage.toJSON().url
            // }
        }
        
        res.json({"Spots":Spots})

    } else {
        let err = new Error('user not found')
        err.status = 404
        next(err)
    }
})

//get bookings by spot id
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const {user} = req
    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        let err = new Error('Spot couldn\'t be found')
        err.status = 404
        return next(err)
    }

    if (spot.ownerId !== user.id) {
        let spotBookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })

        res.json({"Bookings":spotBookings})
        return;
    }

    let spotBookings = await Booking.findAll({
        where: {
            spotId: user.id
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    })

    res.json({"Bookings": spotBookings})

})

//get reviews for spot by id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        let err = new Error('Spot couldn\'t be found')
        err.status = 404
        return next(err)
    }

    let reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    })

    if (!reviews.length) {
        res.send("This spot doesn't have any reviews")
        return
    }

    let reviewsArr = []
    for (let review of reviews) {
        let reviewJSON = review.toJSON()
        let reviewImages = await review.getReviewImages({
            attributes: ['id', 'url']
        })

        let imageArr = []
        for (let image of reviewImages) {
            let imageJSON = image.toJSON()
            imageArr.push(imageJSON)
        }

        reviewJSON['ReviewImages'] = imageArr
        reviewsArr.push(reviewJSON)
    }
    // let img = await reviews[0].getReviewImages()
    // console.log(img)

    res.json({"Reviews":reviewsArr})
})

//get spot details from id
router.get('/:spotId', async (req, res, next) => {
    // console.log('test')
    const spot = await Spot.findByPk(req.params.spotId, {
        include: 
            {
                model: SpotImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                }
            }        
    })

    let spotJSON = spot.toJSON()

    // console.log(spot)
    spotJSON['Owner'] = await spot.getUser({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'username']
        }
    })
    spotJSON['avgRating'] = await spot.avgRating()
    if (spot) {
        res.json(spotJSON)
    } else {
        err.message = new Error("Spot not found")
        err.status = 404
        next(err) 
    }
})

//get all spots
router.get('/', async (req, res, next) => {
    let {page, size} = req.query
    let pagination = {}
    if (size < 0) {
        let err = new Error('size can\'t be less than 0')
        err.status = 403
        return next(err)
    }
    if (page < 0) {
        let err = new Error('page can\'t be less than 0')
        err.status = 403
        return next(err)
    }
    
    if (!size || size > 20) size = 20
    if (!page || page > 10) page = 1

    pagination.limit = size
    pagination.offset = (page - 1) * size

    let spots = await Spot.findAll({
        ...pagination
    })

    let spotsArr = []
    for (let spot of spots) {
        spotJSON = spot.toJSON()
        spotJSON['avgRating'] = await spot.avgRating()
        spotsArr.push(spotJSON)
    }

    for (let spot of spotsArr) {
        let previewImage = await SpotImage.findOne({
            where: {
                spotId: spot.id,
                preview: true
            }
        })
        if (previewImage) {
            spot['previewImage'] = previewImage.toJSON().url
        } else {
            spot['previewImage'] = null
        }
    }

    // for (let spot of spotsArr) {
    //    const previewImages = await SpotImage.findAll({
    //     where: {
    //         spotId: spot.id
    //     }
    //    })
    // //    let imageJSON = previewImages[0].toJSON()
    // //    spot['previewImage'] = imageJSON.url
    //    if (previewImages[0].dataValues) {
    //        console.log(previewImages[0])
    //        spot['previewImage'] = previewImages[0].dataValues.url
    //    }
    // }

    res.json(spotsArr)

})

//create booking by spot id
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const {user} = req
    let {startDate, endDate} = req.body
    startDate = new Date(startDate)
    endDate = new Date(endDate)

    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        let err = new Error('Spot couldn\'t be found')
        err.status = 404
        return next(err)
    }

    let spotBookings = await Booking.findAll({
        where: {
            spotId: spot.id
        }
    })
    
    let errorArr = []
    for (let booking of spotBookings) {
        if (startDate >= booking.dataValues.startDate && startDate < booking.dataValues.endDate) {
            errorArr.push('Start date overlaps with another booking')
        }
        if (endDate > booking.dataValues.startDate && endDate <= booking.dataValues.endDate) {
            errorArr.push('End date overlaps with another booking')
        }
    }
    
    if (errorArr.length) {
        let err = new Error('Validation error')
        err.errors = errorArr
        err.status = 400
        return next(err)   
    }

    let newBooking = await Booking.create({
        spotId: spot.id,
        userId: user.id,
        startDate: startDate,
        endDate: endDate
    }) 

    res.json(newBooking)
})

//add image to spot
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const {user} = req
    const {url} = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        let err = new Error('Spot not found')
        err.status = 404
        return next(err)
    }
    if (spot.ownerId !== user.id) {
        let err = new Error('User doesn\'t own this spot')
        err.status = 400
        return next(err)
    }

    let newSpotImage = await SpotImage.create({
        spotId: spot.id,
        url: url,
        preview: true
    })

    let findNewImage = await SpotImage.findOne({
        where: {
            url: url
        },
        attributes: ['id', 'url', 'preview']
    })
    res.json(findNewImage)
    // let spotImages = await spot.getSpotImages()
    // let spotImagesJSON = spotImages.toJSON()
    // console.log(spotImagesJSON)
    // spotImages.url.push(url)
    // res.json(spot)
})

//create a review for spot based on spot id
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {
    const {user} = req
    const {review, stars} = req.body

    const spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        let err = new Error('Spot couldn\'t be found')
        err.status = 404
        return next(err)
    }

    let errorArr = []
    if (!review) errorArr.push('Review text is required')
    if (!stars || stars < 1 || stars > 5) errorArr.push('Stars must be an integer from 1 to 5')
    
    if (errorArr.length > 0) {
        let err = new Error('Validation error')
        err.status = 400
        err.errors = errorArr
        return next(err)
    }

    let newReview = await Review.create({
        userId: user.id,
        review: review,
        stars: stars,
        spotId: spot.id
    })

    res.json(newReview)
})

//create new spot
router.post('/', requireAuth, async (req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const {user} = req
    
    let errorArr = []
    if (!address) errorArr.push("Street address is required");
    if (!city) errorArr.push("City is required");
    if (!state) errorArr.push("State is required");
    if (!country) errorArr.push("Country is required");
    if (!lat) errorArr.push("Latitude is not valid");
    if (!lng) errorArr.push("Longitude is not valid");
    if (!name) errorArr.push("Name is required");
    if (!description) errorArr.push("Description is required");
    if (!price) errorArr.push("Price per day is required");

    if (errorArr.length > 0) {
        let err = new Error('Validation error')
        err.errors = errorArr
        err.status = 400
        return next(err)
    }

    let newSpot = await Spot.create({
        ownerId: user.id,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })

    res.json(newSpot)

})

//edit a spot
router.put('/:spotId', requireAuth, async (req, res, next) => {
    const {
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    } = req.body

    const {user} = req
    
    let errorArr = []
    if (!address) errorArr.push("Street address is required");
    if (!city) errorArr.push("City is required");
    if (!state) errorArr.push("State is required");
    if (!country) errorArr.push("Country is required");
    if (!lat) errorArr.push("Latitude is not valid");
    if (!lng) errorArr.push("Longitude is not valid");
    if (!name) errorArr.push("Name is required");
    if (!description) errorArr.push("Description is required");
    if (!price) errorArr.push("Price per day is required");

    if (errorArr.length > 0) {
        let err = new Error('Validation error')
        err.errors = errorArr
        err.status = 400
        return next(err)
    }

    let spot = await Spot.findByPk(req.params.spotId)
    
    if (!spot) {
        let err = new Error('Spot not found')
        err.status = 404
        return next(err)
    }

    if (spot.ownerId !== user.id) {
        let err = new Error('user doesn\'t own this spot')
        err.status = 404
        return next(err)
    }

    spot.address = address
    spot.city = city
    spot.state = state
    spot.country = country
    spot.lat = lat
    spot.lng = lng
    spot.name = name
    spot.description = description
    spot.price = price

    res.json(spot)
})

//delete a spot
router.delete('/:spotId', requireAuth, async (req, res, next) => {
    const {user} = req
    let spot = await Spot.findByPk(req.params.spotId)

    if (!spot) {
        let err = new Error('Spot not found')
        err.status = 404
        return next(err)
    }

    if (spot.ownerId !== user.id) {
        let err = new Error('user doesn\'t own this spot')
        err.status = 400
        return next(err)
    }

    await spot.destroy()
    await spot.save()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

//error handling
// router.use((err, req, res, next) => {
//     res.status = err.statusCode || 500
//     res.send({
//         error: err.message,
//         errors: err.errors,
//         statusCode: res.status
//     })
// })


module.exports = router;