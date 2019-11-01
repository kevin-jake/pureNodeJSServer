const express = require('express');

const app = express();

app.use((req, res, next) => {
    res.setHeader('x-server-date', new Date())
    return next();
})

app.get('/', (req, res, next) => {
    return res.send('Hello I am a web server');

})

app.get('/time', (req, res, next) => {
    return res.send(new Date().toString());

})

app.get('/hello', (req, res, next) => {
    const name = req.query.name;
    if (!name) {
        return res.status(400).end();
    }
    return res.send(`Hello ${name}`);

});

app.get('/user/:name', (req, res, next) => {
    return res.send(`Userprofile of ${req.params.name}`);

});

app.get('/error', (req, res, next) => {
    throw new Error(`error ito`);

});

// best error handling method below 
app.get('/next', (req, res, next) => {
    setTimeout(() =>{
        next(new Error(`error ito`))
        
    }, 1000);
});



app.listen(3000);


