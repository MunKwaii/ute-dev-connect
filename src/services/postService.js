const Post = require('../models/Post');
const User = require('../models/User');

const createPost = async (userId, text) => {
  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new Error('Người dùng không tồn tại');
    }

    const newPost = new Post({
      text,
      name: user.name,
      avatar: user.avatar,
      user: userId
    });

    const post = await newPost.save();
    return post;
  } catch (error) {
    throw error;
  }
};

const getPostById = async (postId) => {
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const error = new Error('Bài viết không tồn tại');
      error.statusCode = 404;
      throw error;
    }
    return post;
  } catch (error) {
    if (error.kind === 'ObjectId') {
      const invalidIdError = new Error('Định dạng ID bài viết không hợp lệ');
      invalidIdError.statusCode = 400;
      throw invalidIdError;
    }
    throw error;
  }
};

module.exports = {
  createPost,
  getPostById
};
