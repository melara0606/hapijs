'use strict'

const bcrypt = require('bcrypt');

class User {
  constructor(db) {
    this.db = db;
    this.ref = this.db.ref('/');
    this.collection = this.ref.child('users');
  }

  async create(data) {
    data.password = await this.constructor.encrypt(data.password);
    let newUser = this.collection.push();
    newUser.set({
      email: data.email,
      name : data.name,
      password: data.password
    });
    return newUser.key;
  }

  async validateUser(data){
    const userQuery = await this.collection.orderByChild('email').equalTo(data.email).once('value');
    const userFound = userQuery.val();
    if(userFound) {
      const userId = Object.keys(userFound)[0];
      const passwRight = await bcrypt.compare(data.password, userFound[userId].password);
      const result = (passwRight) ? userFound[userId] : false;

      return result;
    }

    return false;
  }

  static async encrypt(password){
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}

module.exports = User;
