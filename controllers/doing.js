const { Doing } = require('../models/Task');

// Add task in progress into DB
exports.addDoingTask = async (req, res) => {
  try {
    const movedTask = await Doing.create({
      id: req.body._id,
      title: req.body.title,
      description: req.body.description,
      creator: req.userData.userId
    });
    res.status(200).json({
      message: 'Moved task successfully',
      task: {
        id: movedTask._id,
        title: movedTask.title,
        description: movedTask.description
      }
    });
  } catch (error) {
    res.status(400).json({
      message: 'Moving task failed'
    });
  }
};

// Get all tasks in progress from DB
exports.getDoingTasks = async (req, res) => {
  try {
    const documents = await Doing.find({ creator: req.userData.userId });
    res.status(200).json({
      message: 'Loading tasks successfully',
      tasks: documents
    });
  } catch (error) {
    res.status(400).json({
      message: 'Loading tasks failed'
    });
  }
};

// Get a single task in progress from DB
exports.getDoingTask = async (req, res) => {
  try {
    const task = await Doing.findById(req.params.id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({
        message: 'Task not found'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Loading task failed'
    });
  }
};

// Update task in progress on DB
exports.updateDoingTask = async (req, res) => {
  try {
    const updatedTask = await Doing.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: 'Task updated',
      task: updatedTask
    });
  } catch (error) {
    res.status(400).json({
      message: 'Updating task failed'
    });
  }
};

// Delete task in progress from DB
exports.deleteDoingTask = async (req, res) => {
  try {
    await Doing.deleteOne({ _id: req.params.id });
    res.status(204).json({
      message: 'Task deleted'
    });
  } catch (error) {
    res.status(400).json({
      message: 'Deleting task failed'
    });
  }
};
