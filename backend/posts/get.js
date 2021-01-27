const {Post} = require('../models');

module.exports = async (req,res) => {
    const id = req.params.id;
    if (id === undefined || id === '' || id === null) {
        res.status(400).json({
            message: 'Post id is required'
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
    res.json({
       post
    })
}