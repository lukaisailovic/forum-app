const express = require('express');
const {getAll,get} = require('./methods');


const router = express.Router();
router.use(express.json());


router.get('/board',getAll);
router.get('/board/:id',get);

module.exports = router;