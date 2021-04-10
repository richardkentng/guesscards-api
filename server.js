require('dotenv').config()
const cors = require('cors')
const express = require('express')

const port = process.env.PORT || 4000
const app = express()

app.use(express.json())
app.use(cors())

//ROUTES
app.get('/', (req, res) => {res.send('homepage of guesscards api')})
app.use('/auth', require('./routes/auth'))
app.use('/sets', require('./routes/sets'))

app.listen(port, () => {console.log('listening to port ' + port + '...' );})