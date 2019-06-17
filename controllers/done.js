const ctrl = require('../models/Task');
const Done = ctrl.done;

// Add completed task into DB
exports.addDoneTask = async (req, res) => {
  const doneTask = new Done({
    id: req.body._id,
    title: req.body.title,
    description: req.body.description,
    creator: req.userData.userId
  });
  try {
    const movedTask = await doneTask.save();
    res.status(200).json({
      message: 'Moved task successfully',
      task: {
        id: movedTask._id,
        title: movedTask.title,
        description: movedTask.description
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Moving task failed'
    });
  }
};

// Get all completed tasks from DB
exports.getDoneTasks = async (req, res) => {
  try {
    const documents = await Done.find({ creator: req.userData.userId });
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

// Get a single completed task from DB
exports.getDoneTask = async (req, res) => {
  try {
    const task = await Done.findById(req.params.id);
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

// Update completed task on DB
exports.updateDoneTask = async (req, res) => {
  try {
    const updatedTask = await Done.updateOne({ _id: req.params.id }, req.body);
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

// Delete completed task from DB
exports.deleteDoneTask = async (req, res) => {
  try {
    await Done.deleteOne({ _id: req.params.id });
    res.status(200).json({
      message: 'Task deleted'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Deleting task failed'
    });
  }
};
