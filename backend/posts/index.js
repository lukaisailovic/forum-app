const express = require('express');
const {getAll, remove, create, update, get} = require('./methods');
const auth = require('../middleware/auth')

const router = express.Router();
router.use(express.json());


router.get('/post',getAll);
router.delete('/post/:id',auth,remove);
router.post('/post/:topicid',auth,create);
router.put('/post/:id',auth, update)
router.get('/post/:id',auth, get)
module.exports = router;