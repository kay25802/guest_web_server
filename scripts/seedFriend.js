// Sequelize 모델 불러오기
const { sequelize, User, Friend, Guestbook} = require('../models');

// 친구 및 방명록 데이터 시드 함수 정의
const seedFriends = async () => {
  try {
    // 모든 테이블을 드롭한 후 다시 생성
    await sequelize.drop();
    await sequelize.sync({ force: true });

    // 사용자 생성
    const user = await User.create({ email: 'user@example.com', password: 'password' });

    // 친구 목록 생성
    const friends = await Friend.bulkCreate([
      { name: '서현이', iconUrl: '/images/friend_1.png', userId: user.id },
      { name: '소연이', iconUrl: '/images/friend_2.png', userId: user.id },
      { name: '인영이', iconUrl: '/images/friend_3.png', userId: user.id },
      { name: '지현이', iconUrl: '/images/friend_4.png', userId: user.id },
      { name: '지훈이', iconUrl: '/images/friend_5.png', userId: user.id },
      { name: '채원이', iconUrl: '/images/friend_6.png', userId: user.id }
    ]);

    // 친구를 위한 방명록 예시
    await Guestbook.create({ title: '안녕 서현아!', content: '서현아 오늘 학교에서 너 급식 먹는 거 봤어!!', category: 'Free', userId: user.id, friendId: friends[0].id });
    await Guestbook.create({ title: '소연아 반가워:)', content: '소연아 우리 더 친하게 지내자ㅎㅎ', category: 'Free', userId: user.id, friendId: friends[1].id });
    await Guestbook.create({ title: '인영언니 내일 만나!', content: '우리 내일 행궁동에서 만나! 사케동도 먹구, 종강했으니깐 맥주도 마시장', category: 'Free', userId: user.id, friendId: friends[2].id });
    await Guestbook.create({ title: '지현아 잘 지내고 있지?', content: '지현아 요즘 뭐하구 지내?? 요즘 날씨도 좋던데 종종 하늘도 올려다보며 늘 소소한 행복이 가득하길 바래!!', category: 'Free', userId: user.id, friendId: friends[3].id });
    await Guestbook.create({ title: '지훈아 나 다녀감', content: '지훈! 나 아영인데.. 너 방명록 잘 구경하고 간다~', category: 'Free', userId: user.id, friendId: friends[4].id });
    await Guestbook.create({ title: '채원 하이~!!', content: '채원!! 나 배고파.. 내일 우리 점심 뭐 먹지?!!! 맛있는 거 먹자~~ 설레ㅎㅎ', category: 'Free', userId: user.id, friendId: friends[5].id });

    console.log("Test data created successfully");
  } catch (error) {
    console.error("Error creating test data: ", error);
  } finally {
    // 데이터베이스 연결 닫기
    await sequelize.close();
  }
};

// 시드 함수 실행
seedFriends().catch(console.error);
