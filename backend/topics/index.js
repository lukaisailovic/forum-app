const express = require('express');
const {getAll,get,remove} = require('./methods');
const auth = require('../middleware/auth')

const router = express.Router();
router.use(express.json());


router.get('/topic', getAll);
router.get('/topic/:id', get);
router.delete('/topic/:id', auth, remove);

module.exports = router;