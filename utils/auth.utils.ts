import { User } from "@prisma/client";
import { SignJWT, jwtVerify } from 'jose';

function getSecretKey() {
  const secretKey = process.env.SECRET_KEY;
  if(!secretKey) {
    throw new Error('Failed to get secret key');
  }
  return new TextEncoder().encode(secretKey);
}

export async function encrypt(payload: User, expiresIn: number) {
  const key = getSecretKey();
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256'})
    .setIssuedAt()
    .setExpirationTime('1 min from now')
    .sign(key);
}

export async function decrypt(token: string) {
  const key = getSecretKey();
  const { payload } = await jwtVerify(token, key, { algorithms: ['HS256']});
  return payload;
}
