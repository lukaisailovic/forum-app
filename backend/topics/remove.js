const {Topic} = require('../models');
module.exports = async (req,res) => {

    const id = req.params.id;
    if (id === undefined || id === '' || id === null) {
        res.status(400).json({
            message: 'Topic id is required'
        });
    }
    const topic = await Topic.findOne({
        where: {
            id,
            userId: req.user.id
        }
    });
    if (topic == null){
        res.status(400).json({
            message: 'Topic with that id does not exist'
        });
    }
    await Topic.destroy({
        where: {
            id,
            userId: req.user.id
        }
    });
    res.json({
        status: true
    })
}