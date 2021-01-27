const {Board,Topic,User,Post} = require('../models');
module.exports = async (req,res) => {

    const id = req.params.id;
    if (id === undefined || id === '' || id === null) {
        res.status(400).json({
            message: 'Note id is required'
        });
    }
    const board = await Board.findOne({
        where: {
            id
        },
        attributes: ['id','name','description'],
        include: {
            model: Topic,
            include: [
                {
                    model: User,
                    attributes: ['username','id']
                },
                {
                    model: Post,
                    attributes: ['content','createdAt'],
                    include: {
                        model: User,
                        attributes: ['username','id']
                    }
                }
            ]
        },

    });
    res.json({
        board
    })
}