import jose from 'jose';
import { RequestHandler } from 'express';
import { schemaUserLogin, schemaUserSingUp } from '../utils/validations';
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
    const { payload } = await jose.jwtVerify(authorization, config.appSecret);
    const { userId } = payload;
    const user = await prisma.user.findUnique({
      where: {
        id: userId as string,
      },
    });
    if (!user) {
      throw new Error('User not found');
    }
    res.locals.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
