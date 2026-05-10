const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Lấy token từ header Authorization
    const authHeader = req.header('Authorization');
    
    // Kiểm tra xem header có tồn tại và bắt đầu bằng 'Bearer ' không
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'Không có token, từ chối truy cập' });
    }

    // Tách lấy token (bỏ qua chữ 'Bearer ')
    const token = authHeader.split(' ')[1];

    // Xác thực token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Gán user từ payload của token vào req (giả định payload có chứa user)
        // Lưu ý: Nếu payload là { user: { id: ... } } thì gán req.user = decoded.user
        req.user = decoded.user || decoded;
        next(); // Chuyển tiếp sang middleware/controller tiếp theo
    } catch (err) {
        return res.status(403).json({ msg: 'Token không hợp lệ hoặc đã hết hạn' });
    }
};
