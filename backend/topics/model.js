const db = require('../database/connection');
const Sequelize = require('sequelize');
const Topic = db.define('topics', {
    title: {
        type: Sequelize.STRING,
    },
    boardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'boards',
            key: 'id'
        }
    },


})

module.exports = Topic;