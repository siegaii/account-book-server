const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(express.static(path.resolve(__dirname, '../../account-book-client/dist')));
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use('/api/v1', api);
app.use(middlewares.notFound);

module.exports = app;
