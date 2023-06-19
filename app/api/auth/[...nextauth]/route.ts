import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      // async authorize(credentials, req) {
      //   // Add logic here to look up the user from the credentials supplied
      //   const rawData = await fetch("http://localhost:3000/api/signin", {
      //     method: "POST",
      //     headers: {
      //       Accept: "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(credentials),
      //   });
      //   const user = await rawData.json();

      //   return user;
      // },
      async authorize(credentials, req) {
        if (!credentials)
          return {
            status: "fail",
            message: "No credentials supplied",
          };
        const hotel_name = req.headers?.host.split(".")[0];
        // Add logic here to look up the user from the credentials supplied
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/sign-in`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              hotel_name: hotel_name,
              email: credentials?.email,
            }),
          }
        );
        const user = await response.json();

        const isMatch = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isMatch) {
          console.log("invalid password");
          return null;
        } else {
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
      console.log("url: ", url);
      console.log("base url: ", baseUrl);
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
