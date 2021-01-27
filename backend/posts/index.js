const express = require('express');
const {getAll, remove} = require('./methods');
const auth = require('../middleware/auth')

const router = express.Router();
router.use(express.json());


router.get('/post',getAll);
router.delete('/post/:id',auth,remove);

module.exports = router;