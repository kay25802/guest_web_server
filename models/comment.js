const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  guestbookId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'guestbooks', // 정확한 테이블 이름 사용
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // 정확한 테이블 이름 사용
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'comments' // 정확한 테이블 이름 사용
});

module.exports = Comment;
