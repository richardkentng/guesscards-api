require('./index')
const User = require('./user')


User.create({
    username: 'coolguy69',
    password: 'ihatethor'
}, (err, createdUser) => {
    if (err) console.log('ERROR when creating user:', err);
    console.log('createdUser:', createdUser);
})
