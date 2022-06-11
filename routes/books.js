const express = require('express')
const router = express.Router()
const Joi = require('joi')
const authMiddleware = require('../middleware/auth')
const Books = require('../model/Books')

// View all books
router.get('/', async (req, res) => {
    const books = await Books.getAll()
    res.render('books', {
        title: 'All books',
        books,
        isBooks: true
    })
})

router.get('/add', (req, res) => {
    res.render('formBooks', {
        title: 'Add new book',
        isBooks: true
    })
})

// Get book by id
router.get('/:id', async (req, res) => {
    Books.findById(req.params.id)
        .then(book => {
            res.render('book', {
                book,
                title: book.name
            })
        })
        .catch(err => {
            console.log(err);
            res.status(400).redirect('/404')
        })
})

// POST request
router.post('/add', authMiddleware, async (req, res) => {
    // Baza chaqiramiz
    // let allBooks = books  // []

    // Validatsiya // hiyalaymiz
    let bookSchema = Joi.object({
        name: Joi.string().min(3).required(),
        year: Joi.number().integer().min(1900).max(2022).required(),
        img: Joi.string(),
        price: Joi.number().integer().required()
    })

    const result = bookSchema.validate(req.body)
    // console.log(!!result.error);  // error bor bo'lsa true yo'q bo'lsa false deydi

    if (result.error) {
        res.status(400).send(result.error.message);
        return
    }

    const book = new Books(
        req.body.name,
        req.body.year,
        req.body.img
    )

    await book.save()
    res.status(201).redirect('/api/books')
})

router.get('/update/:id', authMiddleware, async (req, res) => {
    const oldBook = await Books.findById(req.params.id)

    res.render('updateBook', {
        oldBook,
        title: oldBook.name
    })
})

// Update book
router.post('/update/', authMiddleware, async (req, res) => {
    // Validatsiya // hiyalaymiz
    let bookSchema = Joi.object({
        name: Joi.string().min(3).required(),
        year: Joi.number().integer().min(1900).max(2022).required(),
        img: Joi.string(),
        id: Joi.string(),
        price: Joi.number().integer().required()
    })

    validateBody(req.body, bookSchema, res)

    await Books.updateById(req.body.id, req.body)
    res.redirect('/api/books')
})

// Remove book
router.get('/remove/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    Books.removeById(id).then(() => {
        res.redirect('/api/books')
    }).catch(err => {
        console.log(err)
        res.redirect('/404')
    })
})

function validateBody(body, bookSchema, res) {
    const result = bookSchema.validate(body)
    // console.log(!!result.error);  // error bor bo'lsa true yo'q bo'lsa false deydi

    if (result.error) {
        res.status(400).send(result.error.message);
        return
    }
}

module.exports = router