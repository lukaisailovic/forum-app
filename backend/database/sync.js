const {User,Board,Topic,Post} = require('../models')

module.exports = async () => {
    await User.sync();
    await Board.sync();
    await Topic.sync();
    await Post.sync();
}