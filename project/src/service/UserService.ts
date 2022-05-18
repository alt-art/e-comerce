import { SignJWT } from 'jose';
import prisma from '../prisma';
import { encrypt } from '../utils/encryption';
import config from '../config';

export const createUser = async (name: string, email: string, password: string) => {
  const alreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (alreadyExists) {
    throw new Error('User already exists');
  }
  const hash = await encrypt(password);
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hash,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
  const token = await new SignJWT({
    userId: user.id,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .sign(config.appSecret);
  return {
    ...user,
    token,
  };
};

export const deleteUser = (id: string) => {
  throw new Error('not implemented yet');
};
