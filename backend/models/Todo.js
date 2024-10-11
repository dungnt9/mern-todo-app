const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  completed: { type: Boolean, default: false },
  userId: { type: String, required: true },
  createdAt: { type: Date, required: true }
}, { timestamps: false });

module.exports = mongoose.model('Todo', todoSchema);