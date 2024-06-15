// passport 라이브러리와 로컬 및 카카오 전략 불러오기
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const KakaoStrategy = require('passport-kakao').Strategy;
const path = require('path');
const User = require(path.join(__dirname, '../models/user'));

// 로컬 전략 설정
passport.use(new LocalStrategy(
  {
    usernameField: 'email', // 사용자 이름 필드 설정
    passwordField: 'password' // 비밀번호 필드 설정
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ where: { email } }); // 이메일로 사용자 찾기
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' }); // 사용자가 없을 경우
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' }); // 비밀번호가 틀릴 경우
      }
      return done(null, user); // 성공적으로 인증된 사용자 반환
    } catch (err) {
      return done(err); // 에러 발생 시
    }
  }
));

// 카카오 전략 설정
passport.use(new KakaoStrategy({
    clientID: process.env.KAKAO_CLIENT_ID, // 클라이언트 ID
    clientSecret: process.env.KAKAO_CLIENT_SECRET, // 클라이언트 시크릿
    callbackURL: process.env.KAKAO_CALLBACK_URL // 콜백 URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await User.findOrCreate({ 
        where: { kakaoId: profile.id }, // 카카오 ID로 사용자 찾기 또는 생성
        defaults: {
          email: profile._json.kakao_account.email, // 이메일 설정
          name: profile.displayName, // 이름 설정
          password: 'kakao-login' // 기본 비밀번호 설정
        }
      });
      return done(null, user[0]); // 성공적으로 인증된 사용자 반환
    } catch (err) {
      return done(err); // 에러 발생 시
    }
  }
));

// 사용자 직렬화
passport.serializeUser((user, done) => {
  done(null, user.id); // 사용자 ID를 세션에 저장
});

// 사용자 역직렬화
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id); // ID로 사용자 찾기
    done(null, user); // 사용자 객체 반환
  } catch (err) {
    done(err); // 에러 발생 시
  }
});
