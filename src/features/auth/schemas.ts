import {z} from "zod"

export const loginSchema = z.object({
    email: z.string().trim().min(1, "ایمیل الزامی است").email(),
    password: z.string().min(1, "پسوورد الزامی است"),
  });