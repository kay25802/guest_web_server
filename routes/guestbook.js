const express = require('express');
const router = express.Router();
const { Guestbook, Comment, User } = require('../models');
const isAuthenticated = require('../middlewares/isAuthenticated');

router.get('/welcome', isAuthenticated, (req, res) => {
  res.render('welcome', { email: req.user.email });
});

router.get('/friends', isAuthenticated, async (req, res) => {
  const friends = await User.findAll();
  res.render('friends', { friends });
});

router.get('/friend/:id', isAuthenticated, async (req, res) => {
  const friend = await User.findByPk(req.params.id);
  res.render('friend', { friend });
});

router.get('/friend/:id/guestbooks', isAuthenticated, async (req, res) => {
  const guestbooks = await Guestbook.findAll({ where: { userId: req.params.id }, include: [Comment] });
  res.render('view_guestbooks', { guestbooks });
});

router.get('/friend/:id/create', isAuthenticated, async (req, res) => {
  const friend = await User.findByPk(req.params.id);
  res.render('create_guestbook', { friend });
});

router.post('/friend/:id/guestbooks', isAuthenticated, async (req, res) => {
  const { title, content, category } = req.body;
  await Guestbook.create({
    title,
    content,
    category,
    userId: req.params.id
  });
  res.redirect(`/guestbook/friend/${req.params.id}/guestbooks`);
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

module.exports = router;
