import { Task } from '../schemas/task.schema';
import { Request, Response } from 'express';

// Create a new task and store it into DB
export const create = async (req: Request, res: Response): Promise<Response> => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      creator: (req as any).userData.userId
    });

    return res.status(201).json({ message: 'Task added successfully', task });
  } catch (error) {
    res.status(400).json({ message: 'Creating task failed' });
  }
};

// Get all tasks from DB
export const findAll = async (req: Request, res: Response): Promise<Response> => {
  try {
    const tasks = await Task.find({ creator: (req as any).userData.userId });

    return res.status(200).json({ message: 'Loading tasks successfully', tasks });
  } catch (error) {
    res.status(500).json({ message: 'Loading tasks failed' });
  }
};

// Get a single task from DB
export const findOne = async (req: Request, res: Response): Promise<Response> => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Loading task failed' });
  }
};

// Update task on DB
export const updateOne = async (req: Request, res: Response): Promise<Response> => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(200).json({ message: 'Task updated', task });
  } catch (error) {
    res.status(500).json({ message: 'Updating task failed' });
  }
};

// Delete task from DB
export const deleteOne = async (req: Request, res: Response): Promise<Response> => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.status(204).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Deleting task failed' });
  }
};
