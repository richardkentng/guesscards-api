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


//set show page (see all cards for a set!)
Router.get('/:id', authRequired, (req, res) => {

    Set.findById(req.params.id, (err, foundSet) => {
        if (err) return res.json({msg: 'Error when trying to find specific set by id.', err})
        if (!foundSet) return res.json({msg: 'Unable to find particular set by id.'})

        // console.log('-------------');
        // console.log('I found a set by its id! ===>', foundSet);
        res.status(200).json({set: foundSet})
    })
})


Router.post('/', authRequired, (req, res) => {

    Set.create({name: req.body.name, user: req.userId}, (err, createdSet) => {
        if (err) return res.json({status: 500, err, msg: 'probably failed to create set for user'})
        if (!createdSet) return res.json({status: 500, msg: 'failed to create set for user'})
        console.log('createdSet: ', createdSet);
        res.json({set: createdSet})
    })
    
})

/*
    FLASHCARDS
*/

Router.post('/:id/cards', authRequired, async (req, res) => {
    try {
        const foundSet =  await Set.findById(req.params.id)
        foundSet.cards.push(req.body)
        await foundSet.save()
        // console.log('created flashcard:', foundSet.cards[foundSet.cards.length - 1]);
        res.json({card: foundSet.cards[foundSet.cards.length - 1]})

    } catch (error) {
        return res.json({error})
    }
})

module.exports = Router