require('dotenv').config(); 
const express = require('express'); 

const app = express(); 

// Tạo một đường dẫn (route) mặc định để test trên trình duyệt
app.get('/', (req, res) => {
  res.send('Server Backend Mạng xã hội UTE cho Dev đang chạy thành công!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server đang chạy trên cổng ${PORT}`);
});