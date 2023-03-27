import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { NextAuthOptions } from 'next-auth';
// import EmailProvider from 'next-auth/providers/email';
// import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { prisma } from "../../../prisma";

const authOptions = {
//   pages: {
//     signIn: '/auth/login',
//     signOut: '/auth/login',
//     error: '/auth/login',
//     verifyRequest: '/auth/login?verify=true',
//   },
  callbacks: {
    session({ session, token, user }) {
      console.log('in session callback,', session, token, user);
      if (session.user) {
        session.user.id = token.id;
        session.user.provider = token.provider;
      }
      return session;
    },
    jwt({ token, user, account, profile, isNewUser }) {
      console.log('in jwt user =', user, account, profile, isNewUser);
      console.log(user);
      if (user && account) {
        token.id = user.id;
        token.provider = account.provider;
      }

      return token;
    },
  },
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      httpOptions: {
        timeout: 40000,
      },
      authorization: {
        params: {
          prompt: 'consent',
          // access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
};

export default NextAuth(authOptions);