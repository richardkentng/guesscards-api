const express = require('express')
const Router = express.Router()

const authRequired = require('../middleware/authRequired')

const {findSets, showSet, newSet, editSet, deleteSet, newFlashcard, editFlashcard, deleteFlashcard} = require('../controllers/sets')



//all sets for user
Router.get('/', authRequired, findSets)

//show set (shows all flashcards for set)
Router.get('/:id', authRequired, showSet)

//new set
Router.post('/', authRequired, newSet)

//edit set's name
Router.put('/:id', authRequired, editSet)

//delete set
Router.delete('/:id', authRequired, deleteSet)


/***************    FLASHCARDS    *****************/


//new flashcard for set
Router.post('/:id/cards', authRequired, newFlashcard)

//edit flashcard from set
Router.put('/:id/cards/:id2', authRequired, editFlashcard)


//delete flashcard from set
Router.delete('/:id/cards/:id2', authRequired, deleteFlashcard)


module.exports = Router