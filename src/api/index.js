const express = require('express');
const bill = require('./bill');
const category = require('./category');

const router = express.Router();

router.use('/bill', bill);
router.use('/category', category);

module.exports = router;
