const express = require('express');
const doingController = require('../controllers/doing');

const router = express.Router();

// POST /api/doing/:id
router.post('/', doingController.addDoingTask);

// GET /api/doing
router.get('', doingController.getDoingTasks);

// DELETE /api/doing/:id
router.delete('/:id', doingController.deleteDoingTask);

module.exports = router;
