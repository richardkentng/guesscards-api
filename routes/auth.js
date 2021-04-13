const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const express = require('express')
const { json } = require('express')
const Router = express.Router()
const db = require('../models')




Router.post('/signup', async (req, res) => {

    let {username, password} = req.body
    if (!username || !password) return res.json({status: 400, msg: 'Please fill out both fields for username and password!'})
    username = username.toLowerCase()

    // CHECK IF USERNAME ALREADY EXISTS
    const foundUser = await db.User.findOne({username})
    if (foundUser) return res.json({status: 409, msg: 'That username already exists!'})

    //HASH THE PASSWORD
    const hash = await bcrypt.hash(password, 10)
    if (!hash) return res.json({status: 500, msg: 'Failed to hash the password for a new signup'})


    db.User.create({username, password:hash}, (err, createdUser) => {
        if (err) return res.json({status: 500, msg: 'error occured while trying to create user. Refresh page and try again.', error: err})
        if (!createdUser) return res.json({status: 500, msg: 'failed to create a user in signup route'})

        //**** RETURN A TOKEN
        if (process.env.ACCESS_TOKEN_SECRET == null) return res.json({
            status: 500, 
            msg: 'User has been created...yet secret is undefined. Cannot sign token for this user without secret.'
        })

        const token = jwt.sign({_id: createdUser._id, username}, process.env.ACCESS_TOKEN_SECRET)

        res.json({
            status: 201,
            msg: `Successfuly created account for \"${username}\"!`,
            _id: createdUser._id,
            username,
            token
        })
    })
})





Router.post('/login', async (req, res) => {

    let {username, password} = req.body
    if (!username || !password) return res.json({status: 400, msg: 'Please fill out both fields for username and password!'})
    username = username.toLowerCase()

    //CHECK IF USERNAME ALEADY EXISTS
    const foundUser = await db.User.findOne({username})
    if (!foundUser) return res.json({status: 400, msg: 'Incorrect username or password!'})

    //CHECK IF PASSWORD IS CORRECT
    const checkPassword = await bcrypt.compare(password, foundUser.password)
    if (!checkPassword) return res.json({status: 400, msg: 'Incorrect username or password!'})


    //**** RETURN A TOKEN
    if (process.env.ACCESS_TOKEN_SECRET == null) return res.json({
        status: 500, 
        msg: 'User has been found...yet secret is undefined. Cannot sign token for this user without secret.'
    })

    const token = jwt.sign({_id: foundUser._id, username}, process.env.ACCESS_TOKEN_SECRET)

    res.json({
        status: 200,
        msg: `Welcome back, \"${username}\"!`,
        _id: foundUser._id,
        username,
        token
    })
})


Router.get('/verify', (req, res) => {
    const bearerHeader = req.headers["authorization"]
    if (!bearerHeader) return res.status(400).json({msg: 'bearer header does not exist. Token cant possibly be verified.'})

    const token = bearerHeader.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        if (err) return console.log('Error in auth/: Invalid Token.');
        res.json({status: 200, msg: 'Successfully verified token for navbar!', userData: {_id: payload._id, username: payload.username}})
    })
})



module.exports = Router