import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import "server-only";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    CredentialsProvider({
      name: "Credentials",
      authorize(credentials, req) {
        console.log(`CredentialsProvider authorize`);

        console.log(credentials);
        const { email, id } = credentials as any;
        return Promise.resolve({ email, id });
      },
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
    }),
  ],
  callbacks: {
    signIn(params) {
      console.log("signIn callback");
      console.log(params);
      return true;
    },
    jwt(params) {
      console.log("jwt callback");
      console.log(params);
      const { token, account } = params;
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    session(params) {
      console.log("session callback");
      console.log(params);
      const { session, token } = params as any;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
