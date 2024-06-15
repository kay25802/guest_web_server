// Express와 라우터 모듈 불러오기
const express = require('express');
const router = express.Router();

// 루트 페이지 라우트 설정
router.get('/', (req, res) => {
  res.render('login', { user: req.user }); // 로그인 페이지 렌더링, 사용자 정보 전달
});

// 라우터 모듈 내보내기
module.exports = router;
