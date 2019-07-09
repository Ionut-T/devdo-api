const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

// Populate tasks with creator's information
taskSchema.pre(/^find/, function(next) {
  this.populate('creator');
  next();
});

exports.Todo = mongoose.model('Todo', taskSchema);
exports.Doing = mongoose.model('Doing', taskSchema);
exports.Done = mongoose.model('Done', taskSchema);
