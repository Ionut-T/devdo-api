const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

// POST /api/user
router.post('/signup', userController.signup);

// POST /api/user
router.post('/login', userController.login);

module.exports = router;
