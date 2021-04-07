const mongoose = require('mongoose')


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
    card: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }]
})

const Set = mongoose.model('Set', setSchema)

module.exports = Set