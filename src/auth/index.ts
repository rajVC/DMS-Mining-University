import NextAuth from "next-auth";
import { options } from "./auth";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth(options);