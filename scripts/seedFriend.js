const { sequelize, User, Friend } = require('../models');

const seedFriends = async () => {
  try {
    // 모든 테이블을 드롭한 후 다시 생성
    await sequelize.drop();
    await sequelize.sync({ force: true });

    const user = await User.create({ email: 'user@example.com', password: 'password' });

    await Friend.bulkCreate([
      { name: 'Friend 1', iconUrl: '/images/friend_1.png', userId: user.id },
      { name: 'Friend 2', iconUrl: '/images/friend_2.png', userId: user.id },
      { name: 'Friend 3', iconUrl: '/images/friend_3.png', userId: user.id },
      { name: 'Friend 4', iconUrl: '/images/friend_4.png', userId: user.id },
      { name: 'Friend 5', iconUrl: '/images/friend_5.png', userId: user.id },
      { name: 'Friend 6', iconUrl: '/images/friend_6.png', userId: user.id },
    ]);

    console.log("Test data created successfully");
  } catch (error) {
    console.error("Error creating test data: ", error);
  } finally {
    await sequelize.close();
  }
};

seedFriends().catch(console.error);
