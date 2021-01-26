const Sequelize = require('sequelize')

const db = new Sequelize(
    process.env.DATABASE_NAME || 'forum-app',
    process.env.DATABASE_USER || 'root',
    process.env.DATABASE_PASSWORD || '', {
        host:  process.env.DATABASE_HOST || 'localhost',
        dialect: 'mysql'
    });

module.exports = db;