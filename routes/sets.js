const db = require('../models')
const express = require('express')
const Router = express.Router()
const Set = require('../models/Set')
const authRequired = require('../middleware/authRequired')

Router.get('/', authRequired, (req, res) => {

    Set.find({}, (err, foundSets) => {
        if (err) console.log('!!!!!!! ERROR when finding all sets', err);

        //filter sets by user
        const usersSets = foundSets.filter(set => {
            return set.user == req.userId
        })

        return res.json({sets: usersSets})
    })
})



module.exports = Router