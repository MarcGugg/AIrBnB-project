const express = require('express')
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const app = require('../../app');

const {Spot} = require('../../db/models')
const {requireAuth} = require('../../utils')

//get spot details from id
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {model: SpotImage},
            {model: Owner}
        ]
    })
    
    if (spot) {
        res.json(spot)
    } else {
        err.message = new Error("Spot not found")
        err.statusCode = 404
        next(err) 
    }
})


//error handling
router.use((err, req, res, next) => {
    res.status = err.statusCode || 500
    res.send({
        error: err
    })
})


module.exports = router;