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

    console.log(spot)
    spotJSON['Owner'] = await spot.getUser({
        attributes: {
            exclude: ['createdAt', 'updatedAt', 'username']
        }
    })
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

//error handling
router.use((err, req, res, next) => {
    res.status = err.statusCode || 500
    res.send({
        error: err.message
    })
})


module.exports = router;