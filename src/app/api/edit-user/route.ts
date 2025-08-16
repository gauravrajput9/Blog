import { uploadImage } from "@/lib/cloudinary";
import { connectDB } from "@/lib/mogoDb";
import { User } from "@/models/user.models";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    console.log(formData);
    await connectDB()
    console.log("Connected to Database")
  
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const bio = formData.get("bio") as string;
    const profilePicture = formData.get("profilePicture") as File | null;
  
    let profilePictureUrl = null;
    if (profilePicture && profilePicture instanceof File) {
      const uploaded = await uploadImage(profilePicture);
      console.log("Uploaded Image:", uploaded);
      if (!uploaded) {
        return NextResponse.json({
          errors: "error editing the user profile",
        });
      }
      profilePictureUrl = uploaded.secure_url;
      console.log(profilePictureUrl)
    }
  
    const editedUser = await User.findOneAndUpdate(
      { email },
      { name, bio, image: profilePictureUrl },
      { new: true }
    );
  
    if (!editedUser) {
      return NextResponse.json(
        {
          errors: "Cannot Update User",
        },
        { status: 400 }
      );
    }
    return NextResponse.json({
      editedUser,
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.log(error)
    return NextResponse.json({
        error,
        errors: "Internal Server Error"
    },{status: 500})
  }
}
