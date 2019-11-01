const express = require('express');
const app = express();
app.listen(3000);

const routes = require('./routers');

app.use(express.static('public'))
app.get('/favicon.ico', (req,res,next) => {
    return res.sendStatus(204)
})
app.use('/', routes());

module.export = app;


