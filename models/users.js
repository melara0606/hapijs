'use strict'

const bcrypt = require('bcrypt');

class User {
  constructor(db) {
    this.db = db;
    this.ref = this.db.ref('/');
    this.collection = this.ref.child('users');
  }

  async create(data) {
    data.password = await this.encrypt(data.password);
    const newUser = this.collection.push();
    newUser.set(data);

    return newUser.key;
  }

  async encrypt(password){
    const saltRounds = 10;
    const hashedPassword = bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }
}

module.exports = User;
