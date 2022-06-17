const express = require('express')
const router = express.Router() // {}
// const authMiddleware = require('../middleware/auth')

// GET method // Read
router.get('/', (req, res, next) => {
    res.render('index',
        {
            title: 'Index',
            isHome: true,
        })
})


module.exports = router
