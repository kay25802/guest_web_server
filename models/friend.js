// Sequelize와 데이터 타입 모듈 불러오기
const { DataTypes } = require('sequelize');
// 데이터베이스 연결 설정 불러오기
const sequelize = require('../config/database');

// Friend 모델 정의
const Friend = sequelize.define('Friend', {
  name: {
    type: DataTypes.STRING, // 친구 이름 문자열 타입
    allowNull: false // 이름은 반드시 있어야 함
  },
  iconUrl: {
    type: DataTypes.STRING, // 아이콘 URL 문자열 타입
    allowNull: false // 아이콘 URL은 반드시 있어야 함
  },
  userId: {
    type: DataTypes.INTEGER, // 사용자 ID 정수 타입
    allowNull: false, // 반드시 있어야 함
    references: {
      model: 'users', // 참조하는 테이블 이름
      key: 'id', // 참조하는 테이블의 키
    },
    onDelete: 'CASCADE', // 사용자 삭제 시 친구 정보도 삭제
    onUpdate: 'CASCADE' // 사용자 ID 변경 시 친구의 사용자 ID도 변경
  }
}, {
  tableName: 'friends' // 정확한 테이블 이름 설정
});

// Friend 모델 내보내기
module.exports = Friend;
