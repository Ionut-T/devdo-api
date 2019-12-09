import { Request, Response, NextFunction } from 'express';
import { User } from '../schemas/user.schema';
import asyncWrapper from '../utils/async-wrapper';
import { Err } from '../utils/error-handler';

export const update = asyncWrapper(
  async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });

    if (!user) {
      return next(new Err('No user found!', 404));
    }

    res.status(200).json({ message: 'User updated!', user });
  }
);
