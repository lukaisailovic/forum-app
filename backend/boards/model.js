const db = require('../database/connection');
const Sequelize = require('sequelize');
const Board = db.define('boards', {
    name: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT
    }
})

module.exports = Board;