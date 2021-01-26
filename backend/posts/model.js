const db = require('../database/connection');
const Sequelize = require('sequelize');
const Post = db.define('posts', {
    content: {
        type: Sequelize.TEXT,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    topicId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'topics',
            key: 'id'
        }
    },

})

module.exports = Post;