const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Guestbook = sequelize.define('Guestbook', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
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
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'friends', // 정확한 테이블 이름 사용
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'guestbooks' // 정확한 테이블 이름 사용
});

module.exports = Guestbook;
