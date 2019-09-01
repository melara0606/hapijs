const firebase = require('firebase-admin');
const serviceAccount = require('../config/api.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://hapijs-e9e5f.firebaseio.com/'
});

const db = firebase.database();
const Users = require('./users')

// const User
module.exports = {
  users: new Users(db)
};
