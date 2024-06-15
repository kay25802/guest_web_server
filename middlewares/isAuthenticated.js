// 사용자가 인증되었는지 확인하는 미들웨어 함수
module.exports = function (req, res, next) {
  if (req.isAuthenticated()) {
      return next(); // 인증된 경우, 다음 미들웨어로 진행
  }
  res.redirect('/'); // 인증되지 않은 경우, 루트 페이지로 리디렉션
};
