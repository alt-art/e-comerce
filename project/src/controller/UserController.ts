import { RequestHandler } from 'express';

import * as UserService from '../service/UserService';

export const createUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await UserService.createUser(name, email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserService.loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  const { user } = res.locals;
  try {
    await UserService.deleteUser(user.id);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
