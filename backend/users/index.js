const express = require('express');
const {getAll} = require('./methods');
const {login, register} = require('./auth')

const router = express.Router();
router.use(express.json());


router.get('/user',getAll);
router.post('/user/login',login);
router.post('/user/register',register);


module.exports = router;