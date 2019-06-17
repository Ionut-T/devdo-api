const ctrl = require('../models/Task');
const Todo = ctrl.todo;

// Create a new task and store it into DB
exports.createTask = async (req, res) => {
  const task = new Todo({
    title: req.body.title,
    description: req.body.description,
    creator: req.userData.userId
  });
  try {
    const createdTask = await task.save();
    res.status(201).json({
      message: 'Task added successfully',
      task: {
        id: createdTask._id,
        title: createdTask.title,
        description: createdTask.description
      }
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
    const documents = await Todo.find({ creator: req.userData.userId });
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

// Get a single task from DB
exports.getTask = async (req, res) => {
  try {
    const task = await Todo.findById(req.params.id);
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

// Update task on DB
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Todo.updateOne({ _id: req.params.id }, req.body);
    res.status(200).json({
      message: 'Task updated',
      task: updatedTask
    });
  } catch (error) {
    res.status(500).json({
      message: 'Updating task failed'
    });
  }
};

// Delete task from DB
exports.deleteTask = async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: 'Task deleted'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Deleting task failed'
    });
  }
};
