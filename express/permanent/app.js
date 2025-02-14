const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(
  require('cookie-session')({
    name: 'session',
    keys: ['todo-app-secret'],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(require('cookie-parser')());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  const unauthenticatedRoutes = ['/signup', '/signin', '/favicon.ico'];
  const currentUrl = req.url;
  const isLoggedIn = !!req.session.userId;
  
  if (!isLoggedIn && !unauthenticatedRoutes.includes(currentUrl)) {
    return res.redirect('/signin');
  }

  if (isLoggedIn && unauthenticatedRoutes.includes(currentUrl)) {
    return res.redirect('/');
  }

  next();
});

app.use('/', require('./routes/todo'));
app.use('/signup', require('./routes/signup'));
app.use('/signin', require('./routes/signin'));
app.use('/signout', require('./routes/signout'));

app.use((req, res) => {
  if (req.originalUrl === '/favicon.ico') {
    // ignore favicon
    return res.status(204).json({ nope: true });
  }

  const message = 'お探しのページは存在しません';
  const status = 404;
  res.status(status);
  res.render('error', { message, status });
});

module.exports = app;
