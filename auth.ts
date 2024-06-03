import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { getUserByEmail, getUserById } from './lib/data/users';
 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(8) })
          .safeParse(credentials);
        
        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;

          const user = await getUserByEmail(email);
          if (!user) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
  
        console.log('Invalid credentials'); 
        return null;
      },
    }),
  ],
  callbacks: {
    async session ({ token, session }) {
      session.user.id = token.id;
      session.user.avatar = token.avatar;
      session.user.firstName = token.firstName;
      session.user.lastName = token.lastName;
      session.user.username = token.username;
      session.user.bio = token.bio;
      return session;
    },
    async jwt ({ token }) {
      if(!token.sub) return token;
      const user = await getUserById(token.sub);
      if(!user) return token;
      token.id = user.id;
      token.avatar = user.avatar;
      token.firstName = user.firstName;
      token.lastName = user.lastName;
      token.username = user.username;
      token.bio = user.bio;
      return token;
    }
  }
});