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

//edit a booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const {user} = req
    let {startDate, endDate} = req.body
    startDate = new Date(startDate)
    endDate = new Date(endDate)

    let booking = await Booking.findByPk(req.params.bookingId)

    if (!booking) {
        let err = new Error('Booking couldn\'t be found')
        err.status = 404
        return next(err)
    }

    if (booking.userId !== user.id) {
        let err = new Error('User didn\'t make this booking')
        err.status = 403
        return next(err)
    }

    if ((new Date()) > endDate) {
        let err = new Error('Past bookings can\'t be edited')
        err.status = 403
        return next(err)
    }


    let spotBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        }
    })
    
    let errorArr = []
    for (let booking of spotBookings) {
        if (startDate >= booking.toJSON().startDate && startDate < booking.toJSON().endDate) {
            errorArr.push('Start date overlaps with another booking')
        }
        if (endDate > booking.toJSON().startDate && endDate <= booking.toJSON().endDate) {
            errorArr.push('End date overlaps with another booking')
        }
    }
    
    if (errorArr.length) {
        let err = new Error('Validation error')
        err.errors = errorArr
        err.statusCode = 400
        return next(err)   
    }

    booking.startDate = startDate
    booking.endDate = endDate

    await booking.save()

    res.json(booking)

})

//delete a booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const {user} = req

    let booking = await Booking.findByPk(req.params.bookingId)
    
    // console.log('end date',booking.toJSON().endDate, 'current', new Date())
    // console.log(booking.dataValues.endDate)

    if (!booking) {
        let err = new Error('Booking couldn\'t be found')
        err.status = 404
        return next(err)
    }

    // console.log(await booking.getSpot())
    let bookingSpot = await booking.getSpot()
    // console.log(bookingSpot)

    if (booking.userId !== user.id && bookingSpot.toJSON().ownerId !== user.id) {
        let err = new Error('user cannot delete this booking')
        err.status = 403
        return next(err)
    } 

    if (new Date() >= new Date(booking.toJSON().startDate).getTime() && new Date() < new Date(booking.toJSON().endDate).getTime()) {
        let err = new Error("Bookings that have been started can't be deleted")
        err.status = 403
        return next(err)
    }

    // res.json('ok')
    
    await booking.destroy()
    await booking.save()
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})

module.exports = router;