const { Router } = require('express')
const router = Router()
const Card = require('../model/Card')
const Books = require('../model/Books')

// View card
router.get('/', async (req, res) => {
    const card = await Card.getCard()
    res.render('card', {
        card,
        title: 'Shopping card',
        layout: 'main'
    })
})

// Add book to card
router.post('/add', async (req, res) => {
    const book = await Books.findById(req.body.id)
    await Card.add(book)
    res.redirect('/api/books')
})

router.delete('/delete/:id', async (req, res) => {
    const card = await Card.removeById(req.params.id)
    res.send(card)
})

module.exports = router