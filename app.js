const express = require('express');
const app = express();
const routes = require('./router.js');

app.use(express.json());
app.use("/items", routes);

module.exports = app;