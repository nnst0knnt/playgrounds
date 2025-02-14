const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

app.use(function(req, res, next) {
  if (req.originalUrl === '/favicon.ico') {
    // ignore favicon
    return res.status(204).json({ nope: true });
  }

  next(require('http-errors')(404));
});

app.use(function(err, req, res, _) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
