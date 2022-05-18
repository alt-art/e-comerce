import { RequestHandler } from 'express';

export const createUser: RequestHandler = (req, res, next) => {
  try {
    throw new Error('not implemented yet');
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser: RequestHandler = (req, res, next) => {
  try {
    throw new Error('not implemented yet');
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const authenticateUser: RequestHandler = (req, res, next) => {
  try {
    throw new Error('not implemented yet');
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
