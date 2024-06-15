const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Friend = sequelize.define('Friend', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  iconUrl: {
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
  }
}, {
  tableName: 'friends' // 정확한 테이블 이름 사용
});

module.exports = Friend;
