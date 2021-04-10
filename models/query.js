require('./index')
const User = require('./User')
const Set = require('./Set')
// const Card = require('./Card')


// User.create({
//     username: 'coolguy69',
//     password: 'ihatethor'
// }, (err, createdUser) => {
//     if (err) console.log('!!!!!!! ERROR when creating user:', err);
//     console.log('createdUser:', createdUser);
// })


// Set.create({
//     name: 'spoken chinese',
//     user: "606e3d25e8af4c01f32d04d6"
// }, (err, createdSet) => {
//     if (err) console.log('!!!!!!! ERROR when creating set:', err);
//     console.log('createdSet:', createdSet);
// })

// User.findOne({_id: '606e3d25e8af4c01f32d04d6'}, (err, found) => {
//     if (err) console.log('!!!!!!! ERROR when finding something(s):', err);
//     console.log('found:', found.sets);
// })


// Set.find({}, (err, foundSets) => {
//     if (err) console.log('!!!!!!! ERROR when finding set', err);
//     console.log('foundSets:', foundSets);

// })

//************   task: create a card for a set
// const card = {
//     ques: 'Will you be at home tomorrow before noon?',
//     ans: 'Ni ming tian shang wu zai jia ma?'
// }
// //find the set
// Set.findById('606f3cd70b1841126bf4c98e', function er(err, foundSet) {
//     console.log('------------------------');
//     if (err) console.log('find set by id  query err ====>', err);
//     // console.log('find set by id  query response ====>', foundSet);
//     //if a set was found
//     if (foundSet) {
//         foundSet.cards.push(card)
//         console.log(' i just pushed the card!');
//         foundSet.save()

//     }
// })


//delete a card from a set

async function findSetAndRemoveCard() {
    try {
        const foundSet = await Set.findById("606f3cd70b1841126bf4c98e", er)
        const foundCard = await foundSet.cards.id("606f92b7350c0e3bc3b53f3e").remove()
        await foundSet.save()
        console.log({foundSet});
    } catch (error) {

    }
}
findSetAndRemoveCard()



async function findSetAndUpdateCard() {
    try {
        const foundSet = await Set.findById("606f3cd70b1841126bf4c98e", er)

        //find card by id
        let card
        let cardIndex
        for (let i = 0; i < foundSet.cards.length; i++) {
            if (foundSet.cards[i]._id == "606f5b869bdf5222c19063e4") {
                cardIndex = i
                card = foundSet.cards[i]
                break
            }
        }
        // if (!cardIndex) return res.json({msg: 'Find set and update card. - FAILED to find card\'s index by id.'})
        
        //update the card with req.body
        card.ques = "Will you be at home tomorrow before 12pm?"
        card.ans = card.ans

        //replace old card with updated card and save it
        foundSet.cards.splice(cardIndex, 1, card)
        await foundSet.save()

        // res.json({card})
        console.log({updatedCard: card});

    } catch (error) {
        console.log('!!!!!!!!! ERROR:', error);
        // res.send()
    }
}
findSetAndUpdateCard()





function er(err, res) {
    console.log('------------------------');
    if (err) console.log('query err ====>', err);
    // console.log('query response ====>', res);
}