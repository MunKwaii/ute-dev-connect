const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { validateForgotPassword, validateResetPassword } = require('../middlewares/validators/authValidator');
const { forgotPasswordLimiter, resetPasswordLimiter } = require('../middlewares/rateLimiter');

// API Quên mật khẩu: Áp dụng Rate Limiting -> Validator -> Controller
router.post(
    '/forgot-password', 
    forgotPasswordLimiter, 
    validateForgotPassword, 
    authController.forgotPassword
);

// API Đặt lại mật khẩu: Áp dụng Rate Limiting -> Validator -> Controller
router.post(
    '/reset-password', 
    resetPasswordLimiter, 
    validateResetPassword, 
    authController.resetPassword
);

module.exports = router;
