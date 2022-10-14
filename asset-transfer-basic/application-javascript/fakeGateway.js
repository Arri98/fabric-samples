var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
const config = require('./config.js')

app.use(logger('dev'));
app.use(express.json());



app.get('/', (req, res) => {
    let temp = data;
    data = [];
    res.json(temp);
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

let data = [];

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({});
});


let temp = 30;
let press = 800;
let humi = 30;
let quality = 60;
let move = 30;
let coor = "1, 2";

const calculateNextValue = (delta, max, min, previousV) => {

    let nextValue = (Math.random() * delta*2 - delta) + previousV;
    if(nextValue > max) {
        nextValue = max;
    } else if (nextValue < min) {
        nextValue = min;
    }
    return nextValue;

};

const createFakeData = () => {
    temp = calculateNextValue(config.deltaT, config.maxT, config.minT, temp);
    press = calculateNextValue(config.deltaP, config.maxP, config.minP, press);
    humi = calculateNextValue(config.deltaH, config.maxH, config.minH, humi);
    move = calculateNextValue(config.deltaM, config.maxM, config.minM, move);
    quality = calculateNextValue(config.deltaQ, config.maxQ, config.minQ, quality);

    let sensorFakeData = {
        temperature: temp ,
        pressure: press,
        timestamp: Date.now(),
        humidity: humi,
        airQuality: quality,
        movement: move,
        coordenates: coor,
    };
    console.log(sensorFakeData);
    data.push(sensorFakeData);
    let randomTimeout = Math.random() * (config.maxTimeout - config.minTimeout) + config.minTimeout;
    setTimeout(createFakeData, randomTimeout);
};

createFakeData();

module.exports = app;
