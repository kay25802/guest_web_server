const express = require('express');
const router = express.Router();
const { Guestbook, Comment, User, Friend } = require('../models');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/welcome', isAuthenticated, (req, res) => {
  res.render('welcome', { email: req.user.email });
});

router.get('/friends', isAuthenticated, async (req, res) => {
  const friends = await Friend.findAll({ where: { userId: req.user.id } });
  res.render('friends', { friends });
});

router.get('/friend/:id', isAuthenticated, async (req, res) => {
  const friend = await Friend.findByPk(req.params.id);
  if (!friend) {
    return res.status(404).send('Friend not found');
  }
  res.render('friend', { friend });
});

router.get('/friend/:id/create', isAuthenticated, async (req, res) => {
  const friend = await Friend.findByPk(req.params.id);
  if (!friend) {
    return res.status(404).send('Friend not found');
  }
  res.render('create_guestbook', { friend });
});

router.post('/friend/:id/guestbooks', isAuthenticated, async (req, res) => {
  const { title, content, category } = req.body;
  const friend = await Friend.findByPk(req.params.id);
  if (!friend) {
    return res.status(404).send('Friend not found');
  }
  await Guestbook.create({
    title,
    content,
    category,
    userId: req.user.id,
    friendId: req.params.id
  });
  res.redirect(`/guestbook/friend/${req.params.id}/guestbooks`);
});

router.get('/friend/:id/guestbooks', isAuthenticated, async (req, res) => {
  const guestbooks = await Guestbook.findAll({ where: { friendId: req.params.id }, include: [Comment] });
  res.render('view_guestbooks', { guestbooks });
});

router.get('/my-guestbooks', isAuthenticated, async (req, res) => {
  const guestbooks = await Guestbook.findAll({ where: { userId: req.user.id }, include: [Comment] });
  res.render('my_guestbooks', { guestbooks });
});

router.post('/comment', isAuthenticated, async (req, res) => {
  const { content, guestbookId } = req.body;
  await Comment.create({
    content,
    guestbookId,
    userId: req.user.id
  });
  res.redirect('back');
});

// 댓글 삭제 라우트
router.delete('/comment/:id', isAuthenticated, async (req, res) => {
  try {
    const commentId = req.params.id;
    console.log('삭제 요청된 댓글 ID:', commentId);
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      console.log('댓글을 찾을 수 없습니다.');
      return res.status(404).send('Comment not found');
    }

    if (comment.userId !== req.user.id) {
      console.log('권한이 없습니다.');
      return res.status(403).send('You are not authorized to delete this comment');
    }

    await comment.destroy();
    console.log('댓글이 성공적으로 삭제되었습니다.');
    res.sendStatus(200); // 성공적으로 삭제되었음을 응답
  } catch (error) {
    console.error('댓글 삭제 중 오류 발생:', error);
    res.status(500).send('Internal Server Error');
  }
});


module.exports = router;
