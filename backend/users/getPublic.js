const {User, Post} = require('../models');
const Sequelize = require('sequelize')
module.exports = async (req,res) => {

    const id = req.params.id;
    if (id === undefined || id === '' || id === null) {
        res.status(400).json({
            message: 'User id is required'
        });
    }
    const user = await User.findOne({
        where: {
            id
        },
        attributes: {
            include: [
                [Sequelize.fn("COUNT", Sequelize.col("posts.id")), "postCount"],
            ]
        },
        include: {
            model: Post,attributes: []
        },
        group: ['users.id']

    });
    if (user == null){
        res.status(404).json({
            message: 'User with that id does not exist'
        });
    }
    res.json({
        user
    })
}