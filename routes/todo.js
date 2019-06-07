const express = require('express');
const todoController = require('../controllers/todo');

const router = express.Router();

// POST /api/todo
router.post('', todoController.createTask);

// GET /api/todo
router.get('', todoController.getTasks);

// GET /api/todo/:id
router.get('/:id', todoController.getTask);

// PUT /api/todo/:id
router.put('/:id', todoController.updateTask);

// DELETE /api/todo/:id
router.delete('/:id', todoController.deleteTask);

module.exports = router;
