const fs = require('fs')
const path = require('path')

const dir = path.join(__dirname, '..', 'data', 'card.json')

class Card {
    static async add(book) {
        let card = await Card.getCard()
        const idx = card.books.findIndex(item => item.id === book.id) // agar yo'q bo'sa -1

        if (idx === -1) {
            // demak kitob baza yo'q uni cout = 1 qilib yangi object qilib qo'shamiz
            book.count = 1
            card.books.push(book)
        } else {
            // demak idx qandaydur index kalit (idx = 2) kitob bazada bor // faqat count ni +1
            book.count = card.books[idx].count + 1
            card.books[idx] = book
        }

        card.price = card.price + +book.price

        return new Promise((res, rej) => {
            fs.writeFile(dir, JSON.stringify(card), (err) => {
                if (err) rej(err)
                else res()
            })
        })
    }

    static async getCard() {
        return new Promise((res, rej) => {
            fs.readFile(dir, 'utf-8', (err, data) => {
                if (err) rej(err)
                else res(JSON.parse(data))
            })
        })
    }

    static async removeById(id) {
        const card = await Card.getCard() // {books[], price}

        const idx = card.books.findIndex(book => book.id === id)

        card.price = card.price - +card.books[idx].price

        if (card.books[idx].count === 1) {
            // demak kitob soni 1 ta uni baza o'chiramiz
            card.books = card.books.filter(book => book.id !== id)
        } else {
            // demak kitob 1 tadan ko'p uni sonini 1 ga kamaytiramiz
            card.books[idx].count--
        }

        return new Promise((res, rej) => {
            fs.writeFile(dir, JSON.stringify(card), (err) => {
                if (err) rej(err)
                else res(card)
            })
        })

    }
}

module.exports = Card