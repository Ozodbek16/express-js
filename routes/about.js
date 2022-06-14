const express = require('express')
const router = express.Router()
const Card = require("../model/Card");


// GET method // Read
router.get('/', async(req, res, next) => {
    const card = await Card.getCard();
    res.render('about',
        {
            card,
            title: 'About',
            isAbout: true
        })
})

module.exports = router
