const express = require('express');

const taskController = require('../controllers/task');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// POST /api/task
router.post('', checkAuth, taskController.createTask);

// GET /api/task
router.get('', checkAuth, taskController.getTasks);

// GET /api/task/:id
router.get('/:id', checkAuth, taskController.getTask);

// PUT /api/task/:id
router.put('/:id', checkAuth, taskController.updateTask);

// DELETE /api/task/:id
router.delete('/:id', checkAuth, taskController.deleteTask);

module.exports = router;
