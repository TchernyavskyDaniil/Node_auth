const express = require('express');
const router = express.Router();
const passport = require('passport');
const uuidv4 = require('uuid/v4');
const mongoose = require('mongoose');
const User = mongoose.model('user');
const loginToken = mongoose.model('loginToken');
const setCookie = require('../lib/setcookie');

const isAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('message', 'Зарегистрируйтесь или войдите в профиль');
  res.redirect('/');
};

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {user: req.user, message: req.flash('message') });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('loginUsers', (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      req.flash('message', ' укажите правильный логин и пароль!');
      return res.redirect('/');
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err);
      }
      if (req.body.remember) {
        let data = {};
        data.series = uuidv4();
        data.token = uuidv4();
        data.login = user.login;
        let recordDb = new loginToken(data);
        loginToken
          .remove({ login: user.login })
          .then(user => {
            recordDb
              .save()
              .then(user => {
                setCookie(res, data);
                return res.redirect('/profile');
              })
              .catch(next);
          })
          .catch(next);
      } else {
        return res.redirect('/profile');
      }
    })
  })(req, res, next)
});

router.get('/profile', isAuthenticated, function(req, res) {
  console.log(req.user);
  res.render('profile', { user: req.user, message: req.flash('message') });
});

router.get('/out', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
