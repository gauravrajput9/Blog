'use server'
import { connectDB } from "@/lib/mogoDb";
import { User } from "@/models/user.models";
import { NextResponse } from "next/server";

export const getUser = async (userId: string) => {
  try {
    await connectDB()
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return JSON.parse(JSON.stringify(user))
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
