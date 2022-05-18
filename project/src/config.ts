import crypto from 'crypto';

export default {
  appSecret: crypto.randomBytes(64),
};
