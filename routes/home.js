const express = require('express')
const router = express.Router() // {}
// const authMiddleware = require('../middleware/auth')
const Card = require("../model/Card");

// GET method // Read
router.get('/', async(req, res, next) => {
    const card = await Card.getCard();
    res.render('index',
        {
            card,
            title: 'Index',
            isHome: true,
        })
})


module.exports = router
