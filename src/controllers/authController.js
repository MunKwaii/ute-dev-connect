const authService = require('../services/authService');

const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        await authService.handleForgotPassword(email);


        return res.status(200).json({
            success: true,
            message: 'Nếu email tồn tại trong hệ thống, mã OTP đã được gửi đến email của bạn.'
        });
    } catch (error) {
        // Có thể là lỗi 'Email không tồn tại trong hệ thống!' từ service
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, otp, newPassword } = req.body;
        await authService.handleResetPassword(email, otp, newPassword);

        return res.status(200).json({
            success: true,
            message: 'Mật khẩu của bạn đã được đặt lại thành công!'
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    forgotPassword,
    resetPassword
};
