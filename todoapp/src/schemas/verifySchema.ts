import {z} from "zod";  

export const verifySchema = z.object({
    otp: z.string().length(6,"otp should be of length 6")
})