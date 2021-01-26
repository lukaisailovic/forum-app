const {Board,Topic,User} = require('../models');

module.exports = async (req,res) => {
    const boards = await Board.findAll({
        include: {
            model: Topic,
            include: {
                model: User,
                attributes: ['id','username']

            }
        }
    });
    res.json({
        boards
    })
}