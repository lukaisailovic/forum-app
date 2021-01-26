const Joi = require('joi');
const User = require('./model')
const argon2 = require('argon2');


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

module.exports.register = async (req, res) => {
    const { error } = authSchema.validate(req.body)
    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }
    // check if user exists
    const potentialUser = await User.findOne({
        where: {
            username: req.body.username
        }
    })
    if(potentialUser !== null){
        return res.status(400).json({
            message: 'User with that username already exists'
        });
    }
    let passwordHash = null;
    try {
        passwordHash = await argon2.hash(req.body.password);
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: 'Could not register user'
        });
    }
    const user = await User.create({
        username: req.body.username,
        password: passwordHash
    })
    return res.status(201).json(user);
}