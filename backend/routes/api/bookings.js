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

//get all current user's bookings
router.get('/current', requireAuth, async (req, res, next) => {
    const {user} = req
    
    let userBookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        // attributes: {
        //     exclude: ['spotId']
        // },
        include: {
            model: Spot,
            attributes: {
                exclude: ['description', 'createdAt', 'updatedAt']
            }
        }
    })
    /*
            "startDate": "2023-02-03T05:00:00.000Z",
            "endDate": "2023-02-10T05:00:00.000Z",
            "createdAt": "2023-01-26T16:21:35.000Z",
            "updatedAt": "2023-01-26T16:21:35.000Z",
            --------------------------------------
            var today = new Date();
            today.toISOString().substring(0, 10);
            -----------------------------------
            moment(date).format('YYYYMMDD') //seperate package
    */ 
    
    let bookingsArr = []
    for (let booking of userBookings) {
        let bookingJSON = booking.toJSON()
        bookingJSON.startDate = bookingJSON.startDate.toISOString()
        bookingJSON.startDate = bookingJSON.startDate.slice(0, 10)
        
        bookingJSON.endDate = bookingJSON.endDate.toISOString()
        bookingJSON.endDate = bookingJSON.endDate.slice(0, 10)
        // console.log(bookingJSON)

        let previewImages = await booking.Spot.getSpotImages()
        // console.log(previewImages)
        let imageJSON = previewImages[0].toJSON()
        // console.log(imageJSON)
        bookingJSON.Spot['previewImage'] = imageJSON.url

        bookingsArr.push(bookingJSON)
    }
    if (!userBookings) {
        res.json('user has no bookings')
        return
    }

    res.json({"Bookings": bookingsArr})
})



module.exports = router;