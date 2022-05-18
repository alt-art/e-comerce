import bcrypt from 'bcrypt';

export async function encrypt(text: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(`${text}`, salt);
  return hash;
}

export async function compare(text: string, hash: string) {
  const result = await bcrypt.compare(`${text}`, hash);
  return result;
}
