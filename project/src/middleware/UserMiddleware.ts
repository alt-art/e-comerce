import { RequestHandler } from 'express';
import { schemaUserLogin, schemaUserSingUp } from '../utils/validations';
import prisma from '../prisma';
import { verifyToken } from '../utils/encryption';

export const createUser: RequestHandler = async (req, res, next) => {
  try {
    await schemaUserSingUp.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const loginUser: RequestHandler = async (req, res, next) => {
  try {
    await schemaUserLogin.validate(req.body);
    next();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const authenticateUser: RequestHandler = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    const { userId } = await verifyToken(authorization);
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
