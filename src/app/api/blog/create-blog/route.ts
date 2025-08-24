import { authOptions } from "@/lib/authOptions";
import { uploadImage } from "@/lib/cloudinary";
import { connectDB } from "@/lib/mogoDb";
import { Blog } from "@/models/blog.model";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    try {
        await connectDB()

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const session = await getServerSession(authOptions) as any

        if(!session || !session?.user || !session.user.id) {
            return NextResponse.json({
                error: "Unauthorized"
            })
        }

        const formData = await req.formData();
        console.log("Form Data:", formData);

        const title = formData.get("title");
        const content = formData.get("content");
        const category = formData.get("category");
        const coverImage = formData.get("coverImage");

        if(!(coverImage instanceof File)){
            return NextResponse.json({
                error: "Invalid cover image"
            })
        }

        let coverImageUrl = null;
        if (coverImage instanceof File) {
            const uploaded = await uploadImage(coverImage);
            coverImageUrl = uploaded.secure_url;
        }

        const blog = await Blog.create({
            title,
            content,
            author: session.user.id,
            category,
            coverImage: coverImageUrl
        })

        return NextResponse.json({
            blog,
            success: "Blog Created Successfully"
        })

    } catch (error) {
        console.log("Error:", error);
        return NextResponse.json({
            error: "Failed to process form data"
        })
    }
}