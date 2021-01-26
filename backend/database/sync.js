const user = require('../users/model')
const board = require('../boards/model')
const topic = require('../topics/model')
const post = require('../posts/model')

module.exports = async () => {
    await user.sync();
    await board.sync();
    await topic.sync();
    await post.sync();
}