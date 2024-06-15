// Sequelize 라이브러리 불러오기
const { Sequelize } = require('sequelize');
// 환경 변수 설정을 위한 dotenv 불러오기
require('dotenv').config();

// Sequelize 인스턴스 생성 및 데이터베이스 연결 설정
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT
});

// 데이터베이스 연결 확인
sequelize.authenticate()
  .then(() => console.log('Database connected...')) // 연결 성공 시 메시지 출력
  .catch(err => console.log('Error: ' + err)); // 연결 실패 시 에러 메시지 출력

// Sequelize 인스턴스 내보내기
module.exports = sequelize;
