const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.query.userId });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching todos' });
  }
});

router.post('/', async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed,
    userId: req.body.userId,
    workTime: new Date(req.body.workTime)
  });

  try {
    const newTodo = await todo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ message: 'Error creating todo' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.body.userId },  //_id tự động do MongoDB
      {
        title: req.body.title,
        completed: req.body.completed,
        workTime: new Date(req.body.workTime)
      },
      { new: true }  //trả về todo mới sau khi cập nhật.
    );
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ message: 'Todo not found or unauthorized' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Error updating todo' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id, userId: req.query.userId });
    res.json({ message: 'Todo deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting todo' });
  }
});

module.exports = router;