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
const {Review }= require('../../db/models/review');





//error handling
router.use((err, req, res, next) => {
    res.status = err.statusCode || 500
    res.send({
        error: err.message,
        statusCode: res.status
    })
})
