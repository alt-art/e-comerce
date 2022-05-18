import { RequestHandler } from 'express';
import { schemaUserSingUp } from '../utils/validations';
import config from '../config';
import prisma from '../prisma';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    await schemaUserSingUp.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
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
