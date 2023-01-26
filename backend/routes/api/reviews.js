const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// const {app} = require('../../app');

const {Spot} = require('../../db/models')
const {SpotImage} = require('../../db/models')
const {requireAuth} = require('../../utils/auth');
const {Review }= require('../../db/models');
const {ReviewImage }= require('../../db/models');
const spot = require('../../db/models/spot');


//get reviews of current user
router.get('/current', requireAuth, async (req, res, next) => {
    const {user} = req
    const userReviews = await Review.findAll({
        where: {
            userId: user.id
        }
    })

    if (!userReviews || userReviews.length === 0) {
        let err = new Error('user has no reviews')
        err.statusCode = 404
        return next(err)
    }

    let reviewArr = []
    for (let review of userReviews) {
        reviewJSON = review.toJSON()
        let spot = await review.getSpot({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        let spotImages = await spot.getSpotImages()
        // console.log(spotImages)
        reviewJSON['Spot'] = spot.toJSON()
        if (spotImages.length) {
            let spotImagesJSON = spotImages[0].toJSON()
            console.log(reviewJSON['Spot'])
            reviewJSON.Spot['previewImage'] = spotImagesJSON.url
        }
        


        let reviewImages = await review.getReviewImages({
            attributes: ['id', 'url']
        })
        
        let imageArr = []
        for (let image of reviewImages) {
            imageJSON = image.toJSON()
            // imageJSON.remove("reviewId")
            imageArr.push(imageJSON)
        }

        reviewJSON['ReviewImages'] = imageArr

        reviewArr.push(reviewJSON)
    }

    res.json({"Reviews":reviewArr})

})

router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const {url} = req.body
    
    const review = await Review.findByPk(req.params.reviewId)

    if (!review) {
        let err = new Error("Review couldn\'t be found")
        err.statusCode = 404
        return next(err)
    }
    
    let reviewImages = await review.getReviewImages()
    if (reviewImages.length >=10) {
        let err = new Error("Maximum number of images for this resource was reached")
        err.statusCode = 403
        return next(err)
    }
    
    let newReviewImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url: url
    })

    const mostRecentReviewImage = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        },
        attributes: ['id', 'url'],
        order: [['id', 'DESC']],
        limit: 1
    })
    res.json(mostRecentReviewImage)
})

//error handling
// router.use((err, req, res, next) => {
//     res.status = err.statusCode || 500
//     res.send({
//         error: err.message,
//         statusCode: res.status
//     })
// })

module.exports = router;