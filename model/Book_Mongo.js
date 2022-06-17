const { Schema, model } = require('mongoose')

const bookSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
})

module.exports = model('Book', bookSchema)