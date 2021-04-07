const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    set: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Set'
    }]
})


const User = mongoose.model('User', userSchema)

module.exports = User