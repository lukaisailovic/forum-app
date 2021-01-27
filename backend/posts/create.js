const {Post, Topic} = require('../models');
module.exports = async (req, res) => {
    const id = req.params.topicid;
    if (id === undefined || id === '' || id === null) {
        res.status(400).json({
            message: 'Topic id is required'
        });
    }
    const topic = await Topic.findOne({
        where: {
            id,
        }
    });
    if (topic == null) {
        res.status(400).json({
            message: 'Topic with that id does not exist'
        });
    }
    const post = await Post.create({
        userId: req.user.id,
        topicId: id,
        content: req.body.content
    });
    res.status(201).json({
        post
    })
}