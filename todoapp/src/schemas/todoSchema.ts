import {z} from "zod";

export const todoSchema = z.object({
    title: z.string().max(20),
    description: z.string().max(300)
})