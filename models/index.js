const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const User = require('./user');
const Guestbook = require('./guestbook');
const Comment = require('./comment');
const Friend = require('./friend');

User.hasMany(Guestbook, { foreignKey: 'userId' });
Guestbook.belongsTo(User, { foreignKey: 'userId' });

Guestbook.hasMany(Comment, { foreignKey: 'guestbookId' });
Comment.belongsTo(Guestbook, { foreignKey: 'guestbookId' });

User.hasMany(Friend, { foreignKey: 'userId' });
Friend.belongsTo(User, { foreignKey: 'userId' });

Friend.hasMany(Guestbook, { foreignKey: 'friendId' });
Guestbook.belongsTo(Friend, { foreignKey: 'friendId' });

module.exports = {
  User,
  Guestbook,
  Comment,
  Friend,
  sequelize
};
