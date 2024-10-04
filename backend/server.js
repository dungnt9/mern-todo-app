//C:\Users\dung9\Desktop\mern-todo-app\backend\server.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

mongoose.connect('mongodb://localhost/todo_list', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/todos', todoRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
