const express = require('express');
const {getAll, remove, create} = require('./methods');
const auth = require('../middleware/auth')

const router = express.Router();
router.use(express.json());


router.get('/post',getAll);
router.delete('/post/:id',auth,remove);
router.post('/post/:topicid',auth,create);
module.exports = router;