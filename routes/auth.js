// Express와 라우터 모듈 불러오기
const express = require('express');
const router = express.Router();
// Passport 모듈 불러오기
const passport = require('passport');

// 로컬 로그인 라우트
router.post('/login', passport.authenticate('local', {
  successRedirect: '/guestbook/welcome', // 로그인 성공 시 리디렉션할 경로
  failureRedirect: '/', // 로그인 실패 시 리디렉션할 경로
  failureFlash: true // 플래시 메시지를 사용하여 에러 전달
}));

// 로그아웃 라우트
router.get('/logout', (req, res, next) => {
  req.logout((err) => { // 로그아웃 처리
    if (err) { return next(err); } // 에러 발생 시 에러 처리
    res.redirect('/'); // 로그아웃 후 리디렉션할 경로
  });
});

// 카카오 로그인 라우트
router.get('/kakao', passport.authenticate('kakao'));

// 카카오 로그인 콜백 라우트
router.get('/kakao/callback', passport.authenticate('kakao', {
  successRedirect: '/guestbook/welcome', // 로그인 성공 시 리디렉션할 경로
  failureRedirect: '/' // 로그인 실패 시 리디렉션할 경로
}));

// 라우터 모듈 내보내기
module.exports = router;
