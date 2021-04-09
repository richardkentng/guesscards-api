const mongoose = require('mongoose')

const cardSchema = {
    ques: {
        type: String,
        required: true
    },
    ans: {
        type: String,
        required: true
    }
}

const setSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cards: [cardSchema]
})

const Set = mongoose.model('Set', setSchema)

module.exports = Set