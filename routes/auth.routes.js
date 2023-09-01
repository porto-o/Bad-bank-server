const express = require('express');
const {signUp, signIn, signOut, myHistory} = require('../controllers/auth.controller.js')
const {authRequired} = require('../middlewares/validateToken.js');

const router = express.Router()

router.post('/signup', signUp)

router.post('/signin', signIn)

router.post('/signout', signOut)

router.get('/myhistory', authRequired, myHistory)

module.exports = router;