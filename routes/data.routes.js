const express = require('express');
const {getData, deposit} = require('../controllers/data.controller.js')
const {authRequired} = require('../middlewares/validateToken.js');

const router = express.Router()

router.get('/history', authRequired, getData)

router.post('/operation', authRequired, deposit);

module.exports = router;