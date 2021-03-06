const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    //check header for bearerHeader
    const bearerHeader = req.headers['authorization']
    if (!bearerHeader) return res.status(403).json({msg: 'bearerHeader does not exist in middleware'})

    //isolate token
    const token = bearerHeader.split(' ')[1]
    //do not change value of msg.  Front end relies on it.
    if (!token) return res.status(403).json({msg: 'token does not exist in middleware'})

    //verify token.  pull userId out of payload
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return res.status(400).json({ msg: "Invalid token in middleware", err})
        req.userId = payload._id
        req.username = payload.username
        next()
    })

}
