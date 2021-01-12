const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const apiRoute = require('./routes/api/index')
const userRouter = require('./routes/users')
const indexRouter = require('./routes/index')
const { verifyuser } = require('./auth')
const database = require('./databaseHandler')
const cors = require('cors');
const { read } = require('fs');

const app = express();

app.set('client', path.join(__dirname, 'client'))

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoute)
app.use('/users', userRouter)

// app.use('/', indexRouter)
app.use('/', express.static(path.resolve(`${__dirname}/client/build/`)));
app.get('/*', (req, res) => {
  return res.sendFile(path.resolve(`${__dirname}/client/build/index.html`))
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
