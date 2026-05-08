const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log('Kết nối MongoDB Atlas (Online) thành công!');
  } catch (error) {
    console.error('Lỗi kết nối Database:', error.message);
    // Thoát ứng dụng nếu không kết nối được
    process.exit(1);
  }
};

module.exports = connectDB;