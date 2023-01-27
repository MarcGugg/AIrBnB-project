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
const {Booking }= require('../../db/models');
// const spot = require('../../db/models/spot');


//delete review image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const {user} = req
    
    let reviewImage = await ReviewImage.findByPk(req.params.imageId)

    if (!reviewImage) {
        let err = new Error('Image couldn\'t be found')
        err.status = 404
        return next(err)
    }

    let review = await reviewImage.getReview()
    let reviewJSON = review.toJSON()

    if (reviewJSON.userId !== user.id) {
        let err = new Error('User didn\'t make this review')
        err.status = 403
        return next(err)
    }

    await reviewImage.destroy()
    await reviewImage.save()

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})


module.exports = router;