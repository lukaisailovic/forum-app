const express = require('express');
const {get} = require('./methods');
const {login, register} = require('./auth')
const authMiddleware = require('../middleware/auth');

const router = express.Router();
router.use(express.json());


router.get('/user',authMiddleware,get);
router.post('/user/login',login);
router.post('/user/register',register);


module.exports = router;