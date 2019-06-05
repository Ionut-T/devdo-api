const Task = require('../models/Task');

// Create a new task and store it into DB
exports.createTask = async (req, res) => {
  const task = new Task({
    title: req.body.title,
    content: req.body.content
  });
  try {
    const createdTask = await task.save();
    res.status(201).json({
      message: 'Task added successfully',
      taskId: createdTask._id
    });
  } catch (error) {
    res.status(500).json({
      message: 'Creating task failed'
    });
  }
};

// Get all tasks from DB
exports.getTasks = async (req, res) => {
  try {
    const documents = await Task.find();
    res.status(200).json({
      message: 'Fetched tasks successfully',
      tasks: documents
    });
  } catch (error) {
    res.status(500).json({
      message: 'Loading tasks failed'
    });
  }
};

// Get a single task from DB
exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
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

// Delete task from DB
exports.deleteTask = async (req, res) => {
  try {
    await Task.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: 'Task deleted'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Deleting task failed'
    });
  }
};
