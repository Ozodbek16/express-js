const express = require('express')
const app = express() // object // {}
// const helmet = require('helmet')
const morgan = require('morgan')
const path = require('path')
const { create } = require('express-handlebars')

// Importing routes
const homeRouter = require('./routes/home')
const aboutRouter = require('./routes/about')
const booksRouter = require('./routes/books')
const cardRouter = require('./routes/card')

// Dotenv
require('dotenv').config()

const exhbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
})

// View engine
app.engine('hbs', exhbs.engine)
app.set('view engine', 'hbs');
app.set('views', './views');

// Static folder
app.use(express.static(path.join(__dirname, 'public')))

// Middlewares 
const loggerMiddleware = require('./middleware/logger')

app.use(express.json()) // json // requestlar uchun // req body ni json formatga aylantirib beradi

// urlencoded request
app.use(express.urlencoded({ extended: true }))

// HTTP headers security middleware
// app.use(helmet())

// Logger
// console.log(app.get('env'));
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('tiny'))
}

// Custom middleware
app.use(loggerMiddleware)

// Routing
app.use('/404', (req, res) => {
    res.render('404', {
        title: 404
    })
})

app.use('/', homeRouter)
app.use('/about', aboutRouter)
app.use('/api/books', booksRouter)
app.use('/api/card', cardRouter)


try {
    const port = process.env.PORT || 5000
    app.listen(port, () => {
        console.log('Server working on port', port);
    })
} catch (error) {
    console.error(error);
}