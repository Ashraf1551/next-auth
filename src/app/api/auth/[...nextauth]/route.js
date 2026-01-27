import NextAuth from "next-auth";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign in with {name} button
      name: "Credentials",

      // Form inputs
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // My own Login logic
        return null;
      },
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
