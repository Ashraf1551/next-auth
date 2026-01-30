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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        secretCode: {
          label: "Secret Code",
          type: "number",
          placeholder: "enter ",
        },
      },
      async authorize(credentials, req) {
        const { username, password, secretCode } = credentials;

        // Find User
        const user = userList.find((u) => u.username == username);
        // if !user => err
        if (!user) return null;

        // Match Password
        const isPasswordOk = user.password == password;

        if (isPasswordOk) {
          return user;
        }

        // My own Login logic
        return null;
      },
    }),
    // ...add more providers here
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
