const express = require('express');

const bill = require('./bill');

const router = express.Router();

router.use('/bill', bill);

module.exports = router;
