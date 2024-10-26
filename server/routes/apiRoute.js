const express = require('express');
const app = express();

app.use('/api/auth/',require('./AuthRoute'));
app.use('/api/product/',require('./ProductRoute'));

module.exports = app;