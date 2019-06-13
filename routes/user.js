const express = require('express');

const router = express.Router();
const userController = require('../controllers/user');

// POST /api/user
router.post('/signup', userController.createUser);

// POST /api/user
router.post('/login', userController.loginUser);

module.exports = router;
