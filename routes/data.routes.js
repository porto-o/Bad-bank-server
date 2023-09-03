const express = require('express');
const {getData, operation} = require('../controllers/data.controller.js')
const {authRequired} = require('../middlewares/validateToken.js');

const router = express.Router()

router.get('/history', authRequired, getData)

router.post('/operation', authRequired, operation);

module.exports = router;