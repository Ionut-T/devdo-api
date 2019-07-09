const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Create user
exports.signup = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(401).json({
        message: 'A user with this email address already exists.'
      });
    }

    const createdUser = await User.create(req.body);
    res.status(201).json({
      message: 'User created',
      user: createdUser
    });
  } catch (error) {
    res.status(401).json({
      message: 'An unknown error has occurred.'
    });
  }
};

// Log in user
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        message: 'Authentication failed. This email is not registered.'
      });
    }

    // Check if password is correct
    if (!(await user.checkPassword(password, user.password))) {
      return res.status(401).json({
        message: 'Authentication failed. The email or password is not correct.'
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id
      },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );
    res.status(200).json({
      message: 'Authentication succeeded',
      token,
      expiresIn: 28800
    });
  } catch (error) {
    return res.status(401).json({
      message: 'Authentication failed.'
    });
  }
};
