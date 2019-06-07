const express = require('express');
const doingController = require('../controllers/doing');

const router = express.Router();

// POST /api/doing/
router.post('', doingController.addDoingTask);

// GET /api/doing
router.get('', doingController.getDoingTasks);

// GET /api/doing/:id
router.get('/:id', doingController.getDoingTask);

// PUT /api/doing/:id
router.put('/:id', doingController.updateDoingTask);

// DELETE /api/doing/:id
router.delete('/:id', doingController.deleteDoingTask);

module.exports = router;
