const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const planetRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');
const morgan = require('morgan');

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(morgan("combined"));
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));
app.use('/planets',planetRouter);
app.use('/launches',launchesRouter);
app.get('/*',(req, res)=>{
    res.send('working');
})

module.exports = app;