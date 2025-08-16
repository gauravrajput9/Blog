import type { AuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { connectDB } from "./mogoDb";
import { User, IUser } from "@/models/user.models";
import mongoose from "mongoose";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  callbacks: {
    // Create user in DB if not exists
    async signIn({ user }) {
      await connectDB();

      const existingUser = await User.findOne({ email: user.email });

      if (!existingUser) {
        await User.create({
          name: user.name || "Unnamed User",
          email: user.email,
          image: user.image,
          role: "user",
        });
      }

      return true;
    },

    // Add DB id and role to session
    async session({ session }: { session: Session }) {
      await connectDB();

      if (!session.user?.email) return session;

      const dbUser = await User.findOne({ email: session.user.email })
        .lean<IUser & { _id: mongoose.Types.ObjectId }>();

      if (dbUser && session.user) {
        session.user.id = dbUser._id.toString();
        session.user.role = dbUser.role;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
