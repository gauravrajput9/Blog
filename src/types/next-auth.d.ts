declare module "next-auth" {
  interface Session {
    user?: {
      id?: string;
      role?: "user" | "author" | "admin";
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
