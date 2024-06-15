// Sequelize와 데이터 타입 모듈 불러오기
const { DataTypes } = require('sequelize');
// 데이터베이스 연결 설정 불러오기
const sequelize = require('../config/database');

// Guestbook 모델 정의
const Guestbook = sequelize.define('Guestbook', {
  title: {
    type: DataTypes.STRING, // 방명록 제목 문자열 타입
    allowNull: false // 제목은 반드시 있어야 함
  },
  content: {
    type: DataTypes.TEXT, // 방명록 내용 텍스트 타입
    allowNull: false // 내용은 반드시 있어야 함
  },
  category: {
    type: DataTypes.STRING, // 방명록 카테고리 문자열 타입
    allowNull: false // 카테고리는 반드시 있어야 함
  },
  userId: {
    type: DataTypes.INTEGER, // 사용자 ID 정수 타입
    allowNull: false, // 반드시 있어야 함
    references: {
      model: 'users', // 참조하는 테이블 이름
      key: 'id', // 참조하는 테이블의 키
    },
    onDelete: 'CASCADE', // 사용자 삭제 시 방명록도 삭제
    onUpdate: 'CASCADE' // 사용자 ID 변경 시 방명록의 사용자 ID도 변경
  },
  friendId: {
    type: DataTypes.INTEGER, // 친구 ID 정수 타입
    allowNull: false, // 반드시 있어야 함
    references: {
      model: 'friends', // 참조하는 테이블 이름
      key: 'id', // 참조하는 테이블의 키
    },
    onDelete: 'CASCADE', // 친구 삭제 시 방명록도 삭제
    onUpdate: 'CASCADE' // 친구 ID 변경 시 방명록의 친구 ID도 변경
  }
}, {
  tableName: 'guestbooks' // 정확한 테이블 이름 설정
});

// Guestbook 모델 내보내기
module.exports = Guestbook;
