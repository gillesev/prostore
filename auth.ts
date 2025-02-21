import NextAuth, { NextAuthConfig } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { prisma } from './db/prisma';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compareSync } from 'bcrypt-ts-edge';

export const config: NextAuthConfig = {
    pages: {
        signIn: '/sign-in',
        signOut: '/sign-out',
        error: '/sign-in'
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days       
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            credentials: {
              email: { type: "email" },
              password: { type: "password" }
            },
            async authorize(credentials) {
              // You need to provide your own logic here that takes the credentials
              // submitted and returns either a object representing a user or value
              // that is false/null if the credentials are invalid.
              // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
              // You can also use the `req` object to obtain additional parameters
              // (i.e., the request IP address)

              if (credentials === null) {
                return null;
              }

              const user = await prisma.user.findFirst({
                where: {
                    email: credentials.email as string
                }
              });

              if (user && user.password) {
                if (compareSync(credentials.password as string, user.password)) {
                    return {
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    };
                }
              }

              return null;
            }
          })        
    ],
    callbacks: {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        async session({ session, trigger, token, user }) {
            session.user.id = token.sub!;
            if (trigger === 'update') {
                session.user.name = user.name;
            }

            return session;
        }
    }
};

export const { handlers, auth, signIn, signOut } = NextAuth(config);