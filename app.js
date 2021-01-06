var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var database = require('./database');
// const { errorLog } = require('./errorHandle');

var app = express();

app.set('client', path.join(__dirname, 'client'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/', express.static(path.resolve(`${__dirname}/client/build/`)));
app.get('/*', (req, res) => res.sendFile(path.resolve(`${__dirname}/client/build/index.html`)))

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// database.createTable('CREATE TABLE students(name varchar2(10))')
// database.insertValues('INSERT INTO books(name) VALUES(?)', ['I too had a love story'], errorLog)

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
