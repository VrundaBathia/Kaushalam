const Task = require('../models/Task');

// Get all tasks
const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
};

// Create a new task
const createTask = async (req, res) => {
  const { text } = req.body;
  const task = new Task({ text });
  await task.save();
  res.status(201).json(task);
};

// Update a task
const updateTask = async (req, res) => {
  const { text } = req.body;
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  task.text = text || task.text;
  await task.save();
  res.json(task);
};

// Delete a task
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });

  await task.remove();
  res.status(204).end();
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
