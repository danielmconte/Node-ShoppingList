const express = require('express');
const app = express();
const routes = require('./router.js');

app.use(express.json());
app.use("/boat-slips", routes);

module.exports = app;