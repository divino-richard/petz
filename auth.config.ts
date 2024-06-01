import type { NextAuthConfig } from 'next-auth';

const publicPaths = ['/', '/signin', '/signup'];

export const authConfig = {
  pages: {
    signIn: '/signin',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublic = publicPaths.includes(nextUrl.pathname);

      if (!isPublic) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      return true;
    },
    async redirect({url, baseUrl}) {
      if (url === '/signin' && baseUrl) {
        return baseUrl;
      }
      return url.startsWith(baseUrl) ? url : baseUrl;
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;