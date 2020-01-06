import asyncWrapper from '../utils/async-wrapper';
import { Request, Response, NextFunction } from 'express';
import { Project } from '../schemas/project.schema';
import { Err } from '../utils/error-handler';
import { Task } from '../schemas/task.schema';

/**
 * Create project.
 */
export const create = asyncWrapper(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      creator: (req as any).userData.userId
    });

    res.status(201).json({ message: 'Project created', project });
  }
);

/**
 * Find all projects.
 */
export const findAll = asyncWrapper(
  async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const projects = await Project.find({ creator: (req as any).userData.userId });

    res.status(200).json({ message: 'Loading projects successfully', results: projects.length, projects });
  }
);

/**
 * Get a single project from DB.
 */
export const findOne = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return next(new Err('Project not found', 404));
    }

    res.status(200).json({ message: 'Project loaded', project });
  }
);

/**
 * Update project.
 */
export const updateOne = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });

    if (!project) {
      return next(new Err('Project not found', 404));
    }

    res.status(200).json({ message: 'Project updated', project });
  }
);

/**
 * Delete project.
 */
export const deleteOne = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const project = await Project.findByIdAndDelete(req.params.id);
    console.log('TCL: project', project);

    if (!project) {
      return next(new Err('Project not found', 404));
    }

    await Task.deleteMany({ project });

    res.status(204).json({ message: 'Project deleted' });
  }
);
