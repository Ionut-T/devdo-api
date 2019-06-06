const ctrl = require('../models/Task');

const Doing = ctrl.doing;

// Add task in progress into DB
exports.addDoingTask = async (req, res) => {
  const doingTask = new Doing({
    id: req.body._id,
    title: req.body.title,
    content: req.body.content
  });
  const movedTask = await doingTask.save();
  res.status(200).json({
    message: 'Success',
    task: {
      id: movedTask._id,
      title: movedTask.title,
      content: movedTask.content
    }
  });
};

// Get all tasks in progress from DB
exports.getDoingTasks = async (req, res) => {
  try {
    const documents = await Doing.find();
    res.status(200).json({
      message: 'Loading tasks successfully',
      tasks: documents
    });
  } catch (error) {
    res.status(500).json({
      message: 'Loading tasks failed'
    });
  }
};

// Delete task in progress from DB
exports.deleteDoingTask = async (req, res) => {
  try {
    await Doing.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: 'Task deleted'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Deleting task failed'
    });
  }
};
