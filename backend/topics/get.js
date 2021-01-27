const {Board,Topic,User,Post} = require('../models');
module.exports = async (req,res) => {
    const id = req.params.id;
    if (id === undefined || id === '' || id === null) {
        res.status(400).json({
            message: 'Note id is required'
        });
    }
    const topic = await Topic.findOne({
        subQuery:false,
        where: {
            id
        },

        attributes: ['id','title'],
        include: [
            {
                model: User,
                attributes: ['username','id']
            },
            {
                model: Post,
                attributes: ['content','createdAt','id'],
                include: [
                    {
                        model: User,
                        attributes: ['username','id']
                    },

                ]
            },

        ],
        order: [[Post, 'createdAt', 'DESC']]

    });
    res.json({
        topic
    })
}