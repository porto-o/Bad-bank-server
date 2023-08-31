const express = require('express');
const router = express.Router();

router.post('/signup', (req, res) => {
    console.log(req.body);
    res.send('sign up');
})

router.post('/login', (req, res) => {
    console.log(req.body);
    res.send('login');
})

router.post('/operation/:name/:id', (req, res) => {
    const operation = req.params.name;

    if (operation == 'deposit') {
        res.send('deposit');
    } else if (operation == 'withdraw') {
        res.send('withdraw');
    } else if (operation == 'transfer') {
        res.send('transfer');
    } else {
        res.send('operation not found');
    }
});

router.get('/history/:id', (req,res) => {
    res.send('Operations historial')
})

module.exports = router
