/* eslint-disable no-console */
const ctrl = require('../models/Task');
const Done = ctrl.done;

// Add finished task into DB
exports.addDoneTask = async (req, res) => {
  const doneTask = new Done({
    id: req.body._id,
    title: req.body.title,
    content: req.body.content
  });
  try {
    const movedTask = await doneTask.save();
    res.status(200).json({
      message: 'Moved task successfully',
      task: {
        id: movedTask._id,
        title: movedTask.title,
        content: movedTask.content
      }
    });
    console.log(movedTask);
  } catch (error) {
    res.status(500).json({
      message: 'Moving task failed'
    });
  }
};

// Get all finished tasks from DB
exports.getDoneTasks = async (req, res) => {
  try {
    const documents = await Done.find();
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

// Delete finished task from DB
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
