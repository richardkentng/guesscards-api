const db = require('./models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const cors = require('cors')
const express = require('express')
const app = express()

app.use(express.json())
app.use(cors())

//ROUTES
app.use('/auth', require('./routes/auth'))

app.listen(4000, () => {console.log('listening to port 4000');})