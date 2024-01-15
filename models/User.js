const DB = require('../database/DB.js');
const createModel = require('./ORM/Model.js');
const path = require('path');

const UsersDB = new DB(path.resolve('./database/Users.json'));
const Model = createModel(UsersDB);

class User extends Model {
    constructor(username) {
        this.username = username;
    }
}

module.exports = User;