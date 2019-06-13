const express = require('express');
const doingController = require('../controllers/doing');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// POST /api/doing/
router.post('', checkAuth, doingController.addDoingTask);

// GET /api/doing
router.get('', checkAuth, doingController.getDoingTasks);

// GET /api/doing/:id
router.get('/:id', checkAuth, doingController.getDoingTask);

// PUT /api/doing/:id
router.put('/:id', checkAuth, doingController.updateDoingTask);

// DELETE /api/doing/:id
router.delete('/:id', checkAuth, doingController.deleteDoingTask);

module.exports = router;
