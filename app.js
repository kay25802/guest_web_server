require('dotenv').config(); // .env 파일에서 환경 변수 로드
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// 데이터베이스 설정
require('./config/database');

// Passport 설정
require('./config/passport');

// 미들웨어 설정
app.use(bodyParser.urlencoded({ extended: false })); // URL 인코딩된 본문을 파싱
app.use(bodyParser.json()); // JSON 본문을 파싱
app.use(session({
  secret: process.env.SESSION_SECRET, // 세션 암호화에 사용될 비밀 키
  resave: false, // 세션을 항상 저장할지 여부
  saveUninitialized: true, // 초기화되지 않은 세션을 저장할지 여부
  cookie: { maxAge: 1800000 } // 세션 쿠키의 유효 기간 (30분)
}));
app.use(passport.initialize()); // Passport 초기화
app.use(passport.session()); // Passport 세션 설정

// 뷰 엔진 설정
app.set('view engine', 'ejs'); // EJS를 뷰 엔진으로 사용
app.set('views', path.join(__dirname, 'views')); // 뷰 디렉토리 설정
app.use(expressLayouts); // 레이아웃 미들웨어 사용
app.set('layout', 'layout'); // 기본 레이아웃 설정

// 정적 파일 설정
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 제공 디렉토리 설정

// 사용자 변수를 설정하는 미들웨어
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// 라우트 설정
app.use('/', require('./routes/index')); // 기본 라우트
app.use('/auth', require('./routes/auth')); // 인증 관련 라우트
app.use('/guestbook', require('./routes/guestbook')); // 방명록 관련 라우트

// 서버 설정
const PORT = process.env.PORT || 3000; // 포트 설정 (환경 변수 PORT 또는 기본값 3000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
