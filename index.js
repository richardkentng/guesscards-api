const db = require('./models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cors = require('cors')
const express = require('express')
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('landing page!')

})

app.post('/signup', async (req, res) => {
    // console.log('ive been accessed!');
    // res.json(req.body)

    const {username, password} = req.body
    if (!username || !password) return res.json({msg: 'Please fill out both fields for username and password!'})
    const hash = await bcrypt.hash(password, 10)
    if (!hash) return res.json({msg: 'Failed to hash the password for a new signup'})
    db.User.create({username, password:hash}, (err, createdUser) => {
        if (err) console.log('ERROR creating user:', err)
        if (!createdUser) return res.json({msg: 'no user was created upon signup', createdUser})
        //return a token
        if (process.env.ACCESS_TOKEN_SECRET == null) return res.json({msg: 'Failed to return token to new signup. Secret is undefined.'})
        const token = jwt.sign({_id: createdUser._id}, process.env.ACCESS_TOKEN_SECRET)
        console.log('created token:', token);
        res.json({
            msg: 'successfully created token for new signup',
            token
        })
    })
})


app.listen(4000, () => {console.log('listening to port 4000');})