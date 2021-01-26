const board = require('../boards/model')

module.exports = async () => {
    await board.sync()
}