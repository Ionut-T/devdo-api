const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: validator.isEmail
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator(password) {
        return password === this.password;
      }
    }
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});

userSchema.plugin(uniqueValidator);

// Hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;

  next();
});

// Compare passwords
userSchema.methods.checkPassword = async (enteredPassword, userPassword) =>
  await bcrypt.compare(enteredPassword, userPassword);

module.exports = mongoose.model('User', userSchema);
