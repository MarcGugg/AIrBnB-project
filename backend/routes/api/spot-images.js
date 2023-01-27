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

//delete a spot image
router.delete('/:imageId', requireAuth, async (req, res, next) => {
    const {user} = req

    let spotImage = await SpotImage.findByPk(req.params.imageId)

    if (!spotImage) {
        let err = new Error('Spot Image couldn\'t be found')
        err.status = 404
        return next(err)
    }

    let spot = await spotImage.getSpot()
    // console.log(spot.toJSON())
    let spotJSON = spot.toJSON()


    if (spotJSON.ownerId !== user.id) {
        let err = new Error('user doesn\'t own this spot')
        err.status = 403
        return next(err)
    }

    await spotImage.destroy()
    await spotImage.save()

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
    
})

module.exports = router;