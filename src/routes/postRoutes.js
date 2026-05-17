const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

// Import middlewares
const { verifyToken } = require('../middlewares/authMiddleware');

// Import controller
const postController = require('../controllers/postController');

// @route   GET /api/posts
// @desc    Lấy tất cả bài viết mới nhất
// @access  Public
router.get('/', postController.getAllPosts);

// @route   POST /api/posts
// @desc    Tạo bài viết mới
// @access  Private
router.post(
  '/',
  [
    verifyToken,
    [
      check('text', 'Nội dung không được để trống').not().isEmpty()
    ]
  ],
  postController.addPost
);

// @route   GET /api/posts/:id
// @desc    Lấy bài viết theo ID
// @access  Public
router.get('/:id', postController.getPost);

module.exports = router;
