const express = require('express');
const {getAll} = require('./methods');


const router = express.Router();
router.use(express.json());


router.get('/user',getAll);


module.exports = router;