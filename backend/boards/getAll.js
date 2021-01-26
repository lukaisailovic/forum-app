const {Board,Topic} = require('../models');
const Sequelize = require('sequelize')
module.exports = async (req,res) => {
    const boards = await Board.findAll({
        attributes: {
            include: [[Sequelize.fn("COUNT", Sequelize.col("topics.id")), "topicCount"]]
        },
        include: {
            model: Topic,attributes: []
        },
        group: ['boards.id']
    });
    res.json({
        boards
    })
}