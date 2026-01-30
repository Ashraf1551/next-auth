import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// name, email, image
const userList = [
  { name: "hablu", password: "1234" },
  { name: "dablu", password: "5678" },
  { name: "bablu", password: "8901" },
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign in with {name} button
      name: "Email & Passoword",

      // Form inputs
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        // Find User
        // const user = userList.find((u) => u.username == username);
        const user = await dbConnect("users").findOne({ email });
        // if !user => err
        if (!user) return null;

        // Match Password
        const isPasswordOk = await bcrypt.compare(password, user?.password);

        if (isPasswordOk) {
          return user;
        }

        // My own Login logic
        return null;
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },

    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
