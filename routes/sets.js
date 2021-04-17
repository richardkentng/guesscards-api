const express = require('express')
const Router = express.Router()
const Set = require('../models/Set')
const authRequired = require('../middleware/authRequired')

//all sets for user
Router.get('/', authRequired, (req, res) => {

    Set.find({}, (err, foundSets) => {
        if (err) console.log('ERROR when finding all sets', err);

        //filter sets by user
        const usersSets = foundSets.filter(set => {
            return set.user == req.userId
        })

        return res.json({sets: usersSets})
    })
})

//show set (shows all flashcards for set)
Router.get('/:id', authRequired, async (req, res) => {

    //note **  responses without 'set' must contain a 'msg' prop for the frontend to display via toast.
    try {
        const foundSet = await Set.findById(req.params.id)

        foundSet.cards.sort((a, b) => {
            return b.createdAt - a.createdAt
        })

        if (foundSet.user != req.userId) return res.status(400).json({msg: 'Permission denied to access that set!'})

        res.status(200).json({set: foundSet})
    } catch (err) {
        return res.status(500).json({msg: 'Failed to find set by id.', err})
    }
})

// new set
Router.post('/', authRequired, (req, res) => {

    Set.create({name: req.body.name, user: req.userId}, (err, createdSet) => {
        if (err) return res.json({status: 500, err, msg: 'probably failed to create set for user'})
        if (!createdSet) return res.json({status: 500, msg: 'failed to create set for user'})
        res.json({set: createdSet})
    })
    
})

//edit set's name
Router.put('/:id', authRequired, async (req, res) => {
    try {
        const updatedSet = await Set.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})
        res.json({set: updatedSet})

    } catch(err) {
        if (err) res.json({err, msg: 'error trying to update set name'})
    }
})

//delete set
Router.delete('/:id', authRequired, async (req, res) => {
    try {
        const setToDelete = await Set.findByIdAndDelete(req.params.id)
        res.json({set: setToDelete})

    } catch(err) {
        if (err) res.json({err, msg: 'error trying to delete set'})
    }
})



/*****************************************
                FLASHCARDS
*****************************************/

//new flashcard for set
Router.post('/:id/cards', authRequired, async (req, res) => {
    const {ques, ans} = req.body
    if (!ques || !ans) return res.status(400).json({msg: 'New question and answer must be non-empty string.', ques, ans})
    try {
        const foundSet =  await Set.findById(req.params.id)
        foundSet.cards.push(req.body)
        await foundSet.save()
        return res.json({card: foundSet.cards[foundSet.cards.length - 1]})

    } catch (error) {
        res.json({error, msg: 'error trying to create card for set'})
    }
})

//edit flashcard from set
Router.put('/:id/cards/:id2', authRequired, async (req, res) => {
    try {
        const foundSet = await Set.findById(req.params.id)
        //find card by id
        let card
        let cardIndex
        for (let i = 0; i < foundSet.cards.length; i++) {
            if (foundSet.cards[i]._id == req.params.id2) {
                cardIndex = i
                card = foundSet.cards[i]
                break
            }
        }
        if (cardIndex === undefined) return res.json({msg: 'Find set and update card. - FAILED to find card\'s index by id.'})
        //update the card with req.body
        card.ques = req.body.ques
        card.ans = req.body.ans

        //replace old card with updated card and save it
        foundSet.cards.splice(cardIndex, 1, card)
        await foundSet.save()

        res.json({card, cardIndex})

    } catch (error) {
        res.status(500).json({error, msg: 'error trying to edit card from set'})
    }
})


//delete flashcard from set
Router.delete('/:id/cards/:id2', authRequired, async (req, res) => {
    try {
        const foundSet = await Set.findById(req.params.id)
        const foundCard = await foundSet.cards.id(req.params.id2).remove()
        await foundSet.save()
        return res.json({card: foundCard})

    } catch (error) {
        res.status(500).json({error, msg: 'error trying to delete card from set'})
    }
})




module.exports = Router