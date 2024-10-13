const express = require('express');
const cors = require('cors');  //CORS là cơ chế cho phép các trang web từ các domain khác nhau có thể giao tiếp
const mongoose = require('mongoose');  //ODM (Object Data Modeling) cho MongoDB, tương tác MongoDB qua mô hình dữ liệu và truy vấn.
const todoRoutes = require('./routes/todoRoutes');
const morgan = require('morgan'); //ghi log request HTTP

const app = express(); //Khởi tạo ứng dụng Express
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json()); //JSON sẽ được chuyển đổi thành object JavaScript
app.use(morgan('combined'));

mongoose.connect('mongodb://localhost/todo_list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
