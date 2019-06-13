const express = require('express');

const doneController = require('../controllers/done');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// POST /api/done/:id
router.post('', checkAuth, doneController.addDoneTask);

// GET /api/done
router.get('', checkAuth, doneController.getDoneTasks);

// GET /api/done/:id
router.get('/:id', checkAuth, doneController.getDoneTask);

// PUT /api/done/:id
router.put('/:id', checkAuth, doneController.updateDoneTask);

// DELETE /api/done/:id
router.delete('/:id', checkAuth, doneController.deleteDoneTask);

module.exports = router;
