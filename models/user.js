// Sequelize와 데이터 타입 모듈 불러오기
const { DataTypes } = require('sequelize');
// 데이터베이스 연결 설정 불러오기
const sequelize = require('../config/database');
// 비밀번호 암호화를 위한 bcrypt 모듈 불러오기
const bcrypt = require('bcrypt');

// User 모델 정의
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING, // 이메일 문자열 타입
    allowNull: false, // 반드시 있어야 함
    unique: true // 유일해야 함
  },
  password: {
    type: DataTypes.STRING, // 비밀번호 문자열 타입
    allowNull: true // 카카오 로그인 시 비밀번호가 없을 수 있음
  },
  kakaoId: {
    type: DataTypes.STRING, // 카카오 ID 문자열 타입
    allowNull: true // 일반 로그인 시 카카오 ID가 없을 수 있음
  }
}, {
  hooks: {
    // 사용자 생성 전에 비밀번호를 암호화하는 훅
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10); // 솔트 생성
        user.password = await bcrypt.hash(user.password, salt); // 비밀번호 암호화
      }
    }
  }
});

// 비밀번호 유효성을 검사하는 메소드
User.prototype.validPassword = async function (password) {
  return await bcrypt.compare(password, this.password); // 입력된 비밀번호와 저장된 비밀번호 비교
};

// User 모델 내보내기
module.exports = User;
