const express = require('express');
const {getAll, get, remove, create} = require('./methods');
const auth = require('../middleware/auth')

const router = express.Router();
router.use(express.json());


router.get('/topic', getAll);
router.get('/topic/:id', get);
router.delete('/topic/:id', auth, remove);
router.post('/topic/:id', auth, create);

module.exports = router;