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
const review = require('../../db/models/review');

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
            err.statusCode = 400
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
            let previewImages = await SpotImage.findAll({
                where: {
                    spotId: spot.id
                }
            })

            spot['previewImage'] = previewImages[0].dataValues.url
        }
        
        res.json({"Spots":Spots})

    } else {
        let err = new Error('user not found')
        err.statusCode(404)
        next(err)
    }
})

//get reviews for spot by id
router.get('/:spotId/reviews', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        let err = new Error('Spot couldn\'t be found')
        err.statusCode = 404
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
    spotJSON['avgStarRating'] = await spot.avgRating()
    if (spot) {
        res.json(spotJSON)
    } else {
        err.message = new Error("Spot not found")
        err.statusCode = 404
        next(err) 
    }
})

//get all spots
router.get('/', async (req, res, next) => {
    let spots = await Spot.findAll()

    let spotsArr = []
    for (let spot of spots) {
        spotJSON = spot.toJSON()
        spotJSON['avgRating'] = await spot.avgRating()
        spotsArr.push(spotJSON)
    }

    for (let spot of spotsArr) {
       const previewImages = await SpotImage.findAll({
        where: {
            spotId: spot.id
        }
       })

    //    console.log(previewImages[0])
       spot['previewImage'] = previewImages[0].dataValues.url
    }

    res.json(spotsArr)

})

//add image to spot
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const {user} = req
    const {url} = req.body
    const spot = await Spot.findByPk(req.params.spotId)
    if (!spot) {
        let err = new Error('Spot not found')
        err.statusCode = 404
        return next(err)
    }
    if (spot.ownerId !== user.id) {
        let err = new Error('User doesn\'t own this spot')
        err.statusCode = 400
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

//create new spot
router.post('/', requireAuth, async (req, res, next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body
    const {user} = req
    
    const errorArr = []
    if (!address) errorArr.push("Street address is required");
    if (!city) errorArr.push("City is required");
    if (!state) errorArr.push("State is required");
    if (!country) errorArr.push("Country is required");
    if (!lat) errorArr.push("Latitude is not valid");
    if (!lng) errorArr.push("Longitude is not valid");
    if (!name) errorArr.push("Name must be less than 50 characters");
    if (!description) errorArr.push("Description is required");
    if (!price) errorArr.push("Price per day is required");

    if (errors.length > 0) {
        let err = new Error('oopsie')
        err.errors = errorArr
        err.statusCode = 400
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
    
    const errorArr = []
    if (!address) errorArr.push("Street address is required");
    if (!city) errorArr.push("City is required");
    if (!state) errorArr.push("State is required");
    if (!country) errorArr.push("Country is required");
    if (!lat) errorArr.push("Latitude is not valid");
    if (!lng) errorArr.push("Longitude is not valid");
    if (!name) errorArr.push("Name must be less than 50 characters");
    if (!description) errorArr.push("Description is required");
    if (!price) errorArr.push("Price per day is required");

    if (errors.length > 0) {
        let err = new Error('oopsie')
        err.errors = errorArr
        err.statusCode = 400
        return next(err)
    }

    let spot = await Spot.findByPk(req.params.spotId)
    
    if (!spot) {
        let err = new Error('Spot not found')
        err.statusCode = 404
        return next(err)
    }

    if (spot.ownerId !== user.id) {
        let err = new Error('user doesn\'t own this spot')
        err.statusCode = 404
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
        err.statusCode = 404
        return next(err)
    }

    if (spot.ownerId !== user.id) {
        let err = new Error('user doesn\'t own this spot')
        err.statusCode = 400
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
router.use((err, req, res, next) => {
    res.status = err.statusCode || 500
    res.send({
        error: err.message,
        statusCode: res.status
    })
})


module.exports = router;