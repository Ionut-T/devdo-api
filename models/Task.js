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

module.exports = mongoose.model('Task', taskSchema);
