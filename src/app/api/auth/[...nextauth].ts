// app/api/auth/[...nextauth].ts
import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Your custom login logic, for example, verifying a user via Prisma
        const user = await prisma.user.findUnique({
          where: {
            username: credentials?.username,
          },
        });

        if (user && user.password === credentials?.password) {
          return user;
        } else {
          return null; // Return null if the credentials are invalid
        }
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }: { session: Session; user: User }) {
      // Attach role to the session object
      if (user) {
        // session.user.role = user.role;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
