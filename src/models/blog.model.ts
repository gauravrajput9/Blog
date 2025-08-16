import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "@/models/user.models";

export interface IBlog extends Document {
  title: string;
  category: string;
  content: string;
  coverImage?: string; 
  author: IUser["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema<IBlog> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    coverImage: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      required: true,
      enum: ["technology", "health", "finance", "lifestyle"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Blog: Model<IBlog> =
  mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
