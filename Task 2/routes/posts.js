const express = require('express');
const Post = require('../models/post');
const router = express.Router();

// INDEX - Show all posts
router.get('/', async (req, res) => {
  const posts = await Post.find({});
  res.render('index', { posts });
});

// NEW - Show form to create new post
router.get('/new', (req, res) => {
  res.render('new');
});

// CREATE - Add new post to DB
router.post('/', async (req, res) => {
  const { title, content } = req.body;
  await Post.create({ title, content });
  res.redirect('/posts');
});

// SHOW - Show more info about one post
router.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('show', { post });
});

// EDIT - Show form to edit a post
router.get('/:id/edit', async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('edit', { post });
});

// UPDATE - Update a particular post
router.put('/:id', async (req, res) => {
  const { title, content } = req.body;
  await Post.findByIdAndUpdate(req.params.id, { title, content });
  res.redirect(`/posts/${req.params.id}`);
});

// DELETE - Delete a particular post
router.delete('/:id', async (req, res) => {
  await Post.findByIdAndRemove(req.params.id);
  res.redirect('/posts');
});

module.exports = router;
