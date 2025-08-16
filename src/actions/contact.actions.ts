"use server";

import { ContactFormData } from "@/app/contact/page";
import { Contact } from "@/models/contact.model";

export const createContact = async (data: ContactFormData) => {
  try {
    const createdContact = await Contact.create({
      title: data.title,
      name: data.name,
      email: data.email,
      message: data.message,
    });

    return {
      success: "Message sent successfully",
      contact: {
        id: createdContact._id.toString(),
        name: createdContact.name,
        title: createdContact.title,
        email: createdContact.email,
        message: createdContact.message,
      },
    };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to create contact");
  }
};
