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
  }
});

exports.todo = mongoose.model('Todo', taskSchema);
exports.doing = mongoose.model('Doing', taskSchema);
exports.done = mongoose.model('Done', taskSchema);
