import { User } from "@prisma/client";
import NextAuth, { DefaultSession } from "next-auth"
import { DefaultJWT } from "next-auth/jwt";

type ExtendedUser = User & DefaultSession["user"] 

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: ExtendedUser;
  }
}

type ExtendedJWT = User & DefaultJWT;

declare module "next-auth/jwt" {
  interface JWT extends ExtendedJWT {}
}