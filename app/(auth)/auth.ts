import { getUserByEmail } from "@/lib/db";
import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn } = NextAuth({
  providers: [
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
});
