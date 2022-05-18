import bcrypt from 'bcrypt';
import { jwtVerify } from 'jose';
import config from '../config';

export async function encrypt(text: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(`${text}`, salt);
  return hash;
}

export async function compare(text: string, hash: string) {
  const result = await bcrypt.compare(`${text}`, hash);
  return result;
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, config.appSecret);
    return payload as { userId: string };
  } catch (error) {
    throw new Error('Invalid token');
  }
}
