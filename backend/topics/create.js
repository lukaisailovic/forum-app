const {Post, Topic, Board} = require('../models');
const Joi = require('joi');

topicSchema = Joi.object().keys({
    content: Joi.string().min(4).max(150).required(),
    title: Joi.string().min(4).max(25).required(),
});

module.exports = async (req, res) => {
    const id = req.params.id;
    if (id === undefined || id === '' || id === null) {
        res.status(400).json({
            message: 'Board id is required'
        });
    }
    const {error} = topicSchema.validate(req.body)
    if (error) {
        res.status(400).json({
            message: error.details[0].message
        });
    }
    const board = await Board.findOne({
        where: {
            id
        }
    });
    if (board == null) {
        res.status(400).json({
            message: 'Board with that id does not exist'
        });
    }
    let topic = await Topic.create({
        userId: req.user.id,
        title: req.body.title,
        boardId: board.id,
    });
    await Post.create({
        userId: req.user.id,
        content: req.body.content,
        topicId: topic.id
    })
    topic = await Topic.findOne({
        where: {
            id: topic.id
        },
        include: {
            model: Post
        }
    })
    res.status(201).json({
        topic
    })
}