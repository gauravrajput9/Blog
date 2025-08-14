import { connectDB } from "@/lib/mogoDb";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { User } from "@/models/user.models";

export async function POST(request: Request) {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    const { name, email, password } = await request.json();
    console.log("📩 Received data:", { name, email, password });

    // 1️⃣ Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { errors: "Name, Email, and Password are required" },
        { status: 400 }
      );
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email: email.trim() });
    if (existingUser) {
      return NextResponse.json(
        { errors: "User already exists" },
        { status: 409 }
      );
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create new user
    const createdUser = await User.create({
      name: name.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    // 5️⃣ Return success (without password)
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: createdUser._id,
          name: createdUser.name,
          email: createdUser.email,
        },
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Error registering user:", error);
    return NextResponse.json(
      { errors: "Internal Server Error" },
      { status: 500 }
    );
  }
}
