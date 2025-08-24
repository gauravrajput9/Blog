"use server";
import { connectDB } from "@/lib/mogoDb";
import { User } from "@/models/user.models";

export const getUser = async (userId: string) => {
  try {
    await connectDB();
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
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const getAllUsers = async () => {
  try {
    await connectDB();
    const users = await User.find({ role: { $ne: "admin" } });
    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
  }
};

export const updateRoleOfTheUser = async (
  userId: string,
  role: "user" | "author"
) => {
  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.role = role;
    await user.save();

    const users = await User.find();

    return JSON.parse(JSON.stringify(users));
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const getAllAuthors = async () => {
  try {
    await connectDB();
    const data = await User.find({ role: "author" });
    console.log(data);
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    throw error;
  }
};
