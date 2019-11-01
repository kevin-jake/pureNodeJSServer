const express = require('express');
const app = express();
app.listen(3000);

const routes = require('./routers');

app.use('/', routes());

module.export = app;

