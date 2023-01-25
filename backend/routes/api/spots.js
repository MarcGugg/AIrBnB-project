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
const review = require('../../db/models/review');



//get all spots owned by current user
router.get('/current', requireAuth, async(req, res, next) => {
    const {user} = req
    if (user) {
        console.log(user)
        let userSpots = await Spot.findAll({
            where: {
                ownerId: user.id
            }
        })
        console.log('user spots',userSpots)
        if(!userSpots || userSpots.length === 0) {
            let err = new Error('user doesn\'t seem to have spots')
            err.statusCode = 400
            next(err)
            return
        }

        res.json(userSpots)
        
    } else {
        err.statusCode = 404
        err.message = new Error('user not found')
        next(err)
    }
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

// //get all spots owned by current user
// router.get('/current', requireAuth, async(req, res, next) => {
//     const {user} = req
//     if (user) {
//         let userSpots = await Spot.findAll({
//             where: {
//                 ownerId: user.id
//             }
//         })

//         if(!userSpots) {
//             err.statusCode = 400
//             err.message = new Error('user doesn\'t seem to have spots')
//             next(err)
//             return
//         }

//         res.json(userSpots)

//     } else {
//         err.statusCode = 404
//         err.message = new Error('user not found')
//         next(err)
//     }
// })

//error handling
router.use((err, req, res, next) => {
    res.status = err.statusCode || 500
    res.send({
        error: err.message
    })
})


module.exports = router;