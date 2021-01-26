const db = require('../database/connection');
const Sequelize = require('sequelize');
const User = db.define('users', {
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },

})

module.exports = User;