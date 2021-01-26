const db = require('./database/connection');
const Sequelize = require('sequelize');

const User = db.define('users', {
    username: {
        type: Sequelize.STRING,
    },
    password: {
        type: Sequelize.STRING,
    },

});
const Board = db.define('boards', {
    name: {
        type: Sequelize.STRING,
    },
    description: {
        type: Sequelize.TEXT
    }
});

const Topic = db.define('topics', {
    title: {
        type: Sequelize.STRING,
    },
});

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

});

/**
 * Relations
 */
Topic.belongsTo(Board);
Board.hasMany(Topic);
Post.belongsTo(User);
User.hasMany(Post);
Post.belongsTo(Topic);
Topic.hasMany(Post);

exports.Topic = Topic;
exports.User = User;
exports.Board = Board;
exports.Post = Post;
