const express = require('express');
const router = express.Router();
const { verifyToken, authorizeRole } = require('../middlewares/authMiddleware');

// API Profile cho User
router.get('/user/profile', verifyToken, authorizeRole('user'), (req, res) => {
    res.json({ success: true, message: 'Chào mừng User', userId: req.user.id });
});

// API Profile cho Admin
router.get('/admin/profile', verifyToken, authorizeRole('admin'), (req, res) => {
    res.json({ success: true, message: 'Chào mừng Admin, đây là khu vực quản trị', adminId: req.user.id });
});

module.exports = router;