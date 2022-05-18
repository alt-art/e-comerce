import { RequestHandler } from 'express';

import * as UserService from '../service/UserService';

export const createUser: RequestHandler = (req, res) => {
  const { name, email, password } = req.body;
  try {
    UserService.createUser(name, email, password);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteUser: RequestHandler = (req, res) => {
  const { user } = res.locals;
  try {
    UserService.deleteUser(user.id);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
