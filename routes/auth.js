const express = require('express');
const router = express.Router();
const passport = require('passport');

router.post('/login', passport.authenticate('local', {
  successRedirect: '/guestbook/welcome',
  failureRedirect: '/',
  failureFlash: true
}));

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao', {
  successRedirect: '/guestbook/welcome',
  failureRedirect: '/'
}));

module.exports = router;
