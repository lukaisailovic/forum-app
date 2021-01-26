const Joi = require('joi');
const {User} = require('../models')
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

const signingSecret = process.env.SIGNING_SECRET || 'secret';

authSchema = Joi.object().keys({
    username: Joi.string().trim().min(4).max(20).required(),
    password: Joi.string().min(8).max(20).required()

});

module.exports.login = async (req, res) => {
    // validate request
    const { error } = authSchema.validate(req.body)
    if (error) {
        res.status(400).json({
            message: error.details[0].message
        });
    }
    // get potential user
    const user = await User.findOne({
        where: {
            username: req.body.username
        },
    })
    // check if user exists
    if(user == null){
        return res.status(400).json({
            message: 'User with that username does not exist'
        });
    }
    // check if password match
    try {
        if (!await argon2.verify(user.password, req.body.password)) {
            // password did not match
            return res.status(400).json({
                message: 'Password is incorrect'
            });
        }
    } catch (err) {
        console.log(err)
        return res.status(400).json({
            message: 'Could not login user'
        });
    }
    // sign token
    const token = jwt.sign({
        data: {
            username: user.username,
            id: user.id
        }
    }, signingSecret, { expiresIn: '3h'});
    // return token to user
    return res.status(200).json({
        user: {
            username: user.username
        },
        token

    });
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