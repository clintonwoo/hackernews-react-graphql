import crypto from 'crypto';

export const createHash = (password, salt, iterations) => new Promise((resolve, reject) => {
  const saltBuffer = typeof salt === 'string' ? Buffer.from(salt, 'base64') : salt;

  const callback = (err, derivedKey) => err ? reject(err) : resolve(derivedKey.toString('base64'));
  crypto.pbkdf2(password, saltBuffer, iterations, 512 / 8, 'sha512', callback);
});

export const createSalt = () => crypto.randomBytes(128).toString('base64');
