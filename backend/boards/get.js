const {Board,Topic,User} = require('../models');
module.exports = async (req,res) => {

    const id = req.params.id;
    if (id === undefined || id === '' || id === null) {
        res.status(400).json({
            message: 'Note id is required'
        });
    }
    const boards = await Board.findOne({
        where: {
            id
        },
        attributes: ['name','description'],
        include: {
            model: Topic,
            include: {
                model: User,
                attributes: ['username','id']
            }
        },

    });
    res.json({
        boards
    })
}