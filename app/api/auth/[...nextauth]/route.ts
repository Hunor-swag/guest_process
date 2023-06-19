import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import bcrypt from "bcryptjs";
import { User } from "@/types/typings";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials)
          return {
            status: "fail",
            message: "No credentials supplied",
          };

        const { email, password } = credentials;

        const hotel_name = req.headers?.host.split(".")[0];

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              hotel_name: hotel_name,
              email: email,
            }),
          }
        );

        const user = await response.json();

        if (!user) return null;

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          console.log("Invalid password");
          return null;
        } else {
          console.log("User found & authenticated");
          return user;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return token;
    },
    async session({ session, token, user }) {
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 30 * 24 * 60 * 60,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
