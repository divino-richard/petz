import argon2 from 'argon2';
export const verifyPassword = async(hashed: string, plain: string) => {
  return await argon2.verify(hashed, plain)
}