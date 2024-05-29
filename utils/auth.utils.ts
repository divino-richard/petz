import { User } from "@prisma/client";
import jwt, { JwtPayload } from 'jsonwebtoken';

export function encrypt(payload: User, expiresIn: number) {
  if(!process.env.SECRET_KEY) {
    throw new Error('Failed to get secret key');
  }
  return jwt.sign(payload, process.env.SECRET_KEY, { algorithm: 'HS256', expiresIn });
}

export function decrypt(session: string) {
  if(!process.env.SECRET_KEY) {
    throw new Error('Failed to get secret key')
  }
  return jwt.verify(session, process.env.SECRET_KEY) as JwtPayload;
}
