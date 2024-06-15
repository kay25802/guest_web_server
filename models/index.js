// Sequelize 라이브러리 불러오기
const Sequelize = require('sequelize');
// 데이터베이스 연결 설정 불러오기
const sequelize = require('../config/database');

// 모델 불러오기
const User = require('./user');
const Guestbook = require('./guestbook');
const Comment = require('./comment');
const Friend = require('./friend');

// User와 Guestbook 간의 관계 설정
User.hasMany(Guestbook, { foreignKey: 'userId' }); // 사용자 한 명이 여러 방명록을 가질 수 있음
Guestbook.belongsTo(User, { foreignKey: 'userId' }); // 방명록은 하나의 사용자에 속함

// Guestbook과 Comment 간의 관계 설정
Guestbook.hasMany(Comment, { foreignKey: 'guestbookId' }); // 방명록 하나에 여러 댓글이 달릴 수 있음
Comment.belongsTo(Guestbook, { foreignKey: 'guestbookId' }); // 댓글은 하나의 방명록에 속함

// User와 Friend 간의 관계 설정
User.hasMany(Friend, { foreignKey: 'userId' }); // 사용자 한 명이 여러 친구를 가질 수 있음
Friend.belongsTo(User, { foreignKey: 'userId' }); // 친구는 하나의 사용자에 속함

// Friend와 Guestbook 간의 관계 설정
Friend.hasMany(Guestbook, { foreignKey: 'friendId' }); // 친구 한 명이 여러 방명록을 가질 수 있음
Guestbook.belongsTo(Friend, { foreignKey: 'friendId' }); // 방명록은 하나의 친구에 속함

// 모듈 내보내기
module.exports = {
  User,
  Guestbook,
  Comment,
  Friend,
  sequelize
};
