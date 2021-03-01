const express = require('express');
const middlewares = require('./middlewares');
const api = require('./api');

const app = express();

app.use(express.static('public'));

app.use('/api/v1', api);

app.use(middlewares.notFound);

module.exports = app;
