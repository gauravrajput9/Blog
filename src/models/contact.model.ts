import mongoose, { Model, Schema } from "mongoose";

export interface IContact {
  title: string;
  name: string;
  email: string;
  message: string;
}

const contactSchema: Schema<IContact> = new Schema(
  {
    title: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Contact: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);
