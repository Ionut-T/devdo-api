const express = require('express');

const todoController = require('../controllers/todo');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// POST /api/todo
router.post('', checkAuth, todoController.createTask);

// GET /api/todo
router.get('', checkAuth, todoController.getTasks);

// GET /api/todo/:id
router.get('/:id', checkAuth, todoController.getTask);

// PUT /api/todo/:id
router.put('/:id', checkAuth, todoController.updateTask);

// DELETE /api/todo/:id
router.delete('/:id', checkAuth, todoController.deleteTask);

module.exports = router;
