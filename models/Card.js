const mongoose = require('mongoose')


const cardSchema = new mongoose.Schema({
    ques: {
        type: String,
        required: true
    },
    ans: {
        type: String,
        required: true
    },
    set: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Set',
        required: true
    }
})

const Card = mongoose.model('Card', cardSchema)

module.exports = Card