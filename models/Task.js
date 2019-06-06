const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    require: true
  }
});

exports.todo = mongoose.model('Todo', taskSchema);
exports.doing = mongoose.model('Doing', taskSchema);
exports.done = mongoose.model('Done', taskSchema);
