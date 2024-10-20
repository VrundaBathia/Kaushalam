const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const router = express.Router();

// CRUD Routes for tasks
router.route('/tasks').get(getTasks).post(createTask);
router.route('/tasks/:id').put(updateTask).delete(deleteTask);

module.exports = router;
