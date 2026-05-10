const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ success: false, message: 'Không tìm thấy token, từ chối truy cập' });
    }

    jwt.verify(token, process.env.JWT_SECRET || 'ute_social_network_secret', (err, decoded) => {
        if (err) return res.status(401).json({ success: false, message: 'Token không hợp lệ hoặc đã hết hạn' });
        
        req.user = decoded; 
        next();
    });
};

const authorizeRole = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ success: false, message: 'Không có quyền thực hiện hành động này' });
        }
        next();
    };
};

module.exports = { verifyToken, authorizeRole };