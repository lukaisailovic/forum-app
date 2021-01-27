const {Post} = require('../models');
const Joi = require('joi');

postSchema = Joi.object().keys({
    content: Joi.string().min(4).max(150).required(),
});

module.exports = async (req,res) => {


    const id = req.params.id;

    if (id === undefined || id === '' || id === null) {
        res.status(400).json({
            message: 'Post id is required'
        });
    }
    const { error } = postSchema.validate(req.body)
    if (error) {
        res.status(400).json({
            message: error.details[0].message
        });
    }
    const post = await Post.findOne({
        where: {
            id,
            userId: req.user.id
        }
    });
    if (post == null){
        res.status(400).json({
            message: 'Post with that id does not exist'
        });
    }
    await Post.update({
        content: req.body.content
    },{
        where: {
            id,
            userId: req.user.id
        }
    });
    res.json({
        status: true,

    })
}