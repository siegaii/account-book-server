const express = require('express');

const csv = require('csvtojson');

const router = express.Router();

// async function getCategories() {
//   return csv().fromFile('./data/categories.csv');
// }

// let categories;
// getCategories().then((data) => {
//   categories = data;
// });

router.get('/', async (req, res, next) => {
  try {
    const data = await csv().fromFile('./data/bill.csv');
    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
