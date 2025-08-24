import { connectDB } from "@/lib/mogoDb";
import { User } from "@/models/user.models";
import { NextResponse } from "next/server";

export async function GET(){
  try {
    await connectDB()
    console.log("Connected to db")

    const authors = await User.find({ role: "author" }).limit(5);
    if(!authors){
      return NextResponse.json({
        error: "No authors found"
      })
    }

    return NextResponse.json({
      authors,
      success: "Authors fetched successfully"
    })

  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to fetch authors" },
      { status: 500 }
    );
  }
}