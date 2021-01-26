const jwt = require('jsonwebtoken');
const User = require('../users/model');
const signingSecret = process.env.SIGNING_SECRET || 'secret';

module.exports = async function (req, res, next) {
    try {
        const token = req.header('Authorization');
        if (token == null){
            return res.status(403).json({
                message: 'Unauthorized'
            })
        }
        const decoded = jwt.verify(token.replace('Bearer','').replace(' ',''), signingSecret);
        // check if user id exists
        const decodedUser = decoded.data;
        const user = await User.findOne({
            where: {
                id: decodedUser.id
            },
            attributes: ['id','username','createdAt']
        })
        if (user == null){
            return res.status(403).json({
                message: 'Unauthorized'
            })
        }
        // add user object to request
        req.user = user;
        next()
    } catch(err) {
        console.log(err)
        return res.status(403).json({
            message: 'Unauthorized'
        })
    }
}