import { z } from 'zod';

export const usernameValidation = z.string().min(6,"Username should be atleast 6 characters").max(20,"Username should be atmost 20 characters")
.regex(/^[a-zA-Z0-9]+$/,"Username should contain only alphabets and numbers");

export const signUpSchema = z.object({
    username:usernameValidation,
    password: z.string().min(8),
    email: z.string().email()
})

