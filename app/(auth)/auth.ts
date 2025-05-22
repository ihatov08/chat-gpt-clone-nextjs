import { getUserByEmail } from "@/lib/db";
import { prisma } from "@/lib/prisma";
import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";

export const { handlers, signIn, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      credentials: {},
      async authorize({ email, password }: any) {
        const user = await getUserByEmail(email);

        if (!user) {
          throw new Error("user not found");
        }

        if (!user.passwordHash) {
          throw new Error("user password not exists");
        }

        const result = compareSync(password, user.passwordHash);
        if (!result) {
          throw new Error("user password not match");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, session }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }

      return session;
    },
  },
});
