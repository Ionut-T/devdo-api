const express = require('express');
const doneController = require('../controllers/done');

const router = express.Router();

// POST /api/done/:id
router.post('', doneController.addDoneTask);

// GET /api/done
router.get('', doneController.getDoneTasks);

// GET /api/done/:id
router.get('/:id', doneController.getDoneTask);

// PUT /api/done/:id
router.put('/:id', doneController.updateDoneTask);

// DELETE /api/done/:id
router.delete('/:id', doneController.deleteDoneTask);

module.exports = router;
