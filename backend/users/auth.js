const Joi = require('joi');

authSchema = Joi.object().keys({
    username: Joi.string().trim().min(4).max(20).required(),
    password: Joi.string().min(8).max(20).required()

});

module.exports.login = (req, res) => {
    const { error } = authSchema.validate(req.body)
    if (error) {
        res.status(400).json({
            message: error.details[0].message
        });
    }

}

module.exports.register = (req, res) => {
    const { error } = authSchema.validate(req.body)
    if (error) {
        res.status(400).json({
            message: error.details[0].message
        });
    }
}