const db = require('./models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const cors = require('cors')
const express = require('express')
const app = express()

app.use(express.json())
app.use(cors())

//ROUTES
app.use('/auth', require('./routes/auth'))
app.use('/sets', require('./routes/sets'))

app.listen(process.env.PORT || 4000, () => {console.log('listening to port 4000');})