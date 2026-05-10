const express = require('express');
const router = express.Router();

// Import middlewares
const authMiddleware = require('../middlewares/authMiddleware');
const { validateEditProfile } = require('../middlewares/validators/profileValidator');

// Import controller
const profileController = require('../controllers/profileController');

// @route   PUT /api/profile
// @desc    Tạo mới hoặc cập nhật thông tin hồ sơ (Edit Profile)
// @access  Private
// Các bước middleware: auth -> validation -> controller logic
router.put('/', authMiddleware, validateEditProfile, profileController.editProfile);

module.exports = router;
