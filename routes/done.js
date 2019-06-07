const express = require('express');
const doneController = require('../controllers/done');

const router = express.Router();

// POST /api/doing/:id
router.post('/', doneController.addDoneTask);

// GET /api/doing
router.get('', doneController.getDoneTasks);

// DELETE /api/doing/:id
router.delete('/:id', doneController.deleteDoneTask);

module.exports = router;
