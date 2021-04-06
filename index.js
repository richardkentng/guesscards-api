const express = require('express')
const app = express()


app.get('/', (req, res) => {
    res.send('landing page!')
})



app.listen(4000)