// Sequelize와 데이터 타입 모듈 불러오기
const { DataTypes } = require('sequelize');
// 데이터베이스 연결 설정 불러오기
const sequelize = require('../config/database');

// Comment 모델 정의
const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT, // 댓글 내용 텍스트 타입
    allowNull: false // 내용은 반드시 있어야 함
  },
  guestbookId: {
    type: DataTypes.INTEGER, // 방명록 ID 정수 타입
    allowNull: false, // 반드시 있어야 함
    references: {
      model: 'guestbooks', // 참조하는 테이블 이름
      key: 'id', // 참조하는 테이블의 키
    },
    onDelete: 'CASCADE', // 방명록 삭제 시 댓글도 삭제
    onUpdate: 'CASCADE' // 방명록 ID 변경 시 댓글의 방명록 ID도 변경
  },
  userId: {
    type: DataTypes.INTEGER, // 사용자 ID 정수 타입
    allowNull: false, // 반드시 있어야 함
    references: {
      model: 'users', // 참조하는 테이블 이름
      key: 'id', // 참조하는 테이블의 키
    },
    onDelete: 'CASCADE', // 사용자 삭제 시 댓글도 삭제
    onUpdate: 'CASCADE' // 사용자 ID 변경 시 댓글의 사용자 ID도 변경
  }
}, {
  tableName: 'comments' // 정확한 테이블 이름 설정
});

// Comment 모델 내보내기
module.exports = Comment;
