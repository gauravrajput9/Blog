import {z} from "zod"
export const loginSchema = z.object({
    password: z.string().min(6).max(100),
    email: z.string().email("Please enter a valid email address."),
})

export type LoginFormData = z.infer<typeof loginSchema>;


export const signUpSchema = z.object({
    name: z.string().min(2).max(100),
    password: z.string().min(6).max(100),
    email: z.string().email("Please enter a valid email address."),
})

export type SignUpFormData = z.infer<typeof signUpSchema>;