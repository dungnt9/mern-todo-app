//C:\Users\dung9\Desktop\mern-todo-app\backend\routes\todoRoutes.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos for a specific user
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.query.userId });
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Create a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed,
    userId: req.body.userId,
    createdAt: new Date(req.body.createdAt)
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});

// Update a todo
router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (todo && todo.userId === req.body.userId) {
      todo.title = req.body.title || todo.title;
      todo.completed = req.body.completed !== undefined ? req.body.completed : todo.completed;
      todo.createdAt = new Date(req.body.createdAt) || todo.createdAt;
      const updatedTodo = await todo.save();
      res.json(updatedTodo);
    } else {
      res.status(404).json({ message: 'Todo not found or unauthorized' });
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
});


// Delete a todo
router.delete('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOne({ _id: req.params.id, userId: req.query.userId });
    if (todo) {
      await Todo.deleteOne({ _id: req.params.id });
      res.json({ message: 'Todo deleted' });
    } else {
      res.status(404).json({ message: 'Todo not found or unauthorized' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;