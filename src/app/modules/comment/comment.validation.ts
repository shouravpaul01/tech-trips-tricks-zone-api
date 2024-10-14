import { z } from "zod";

export const commentValidation=z.object({
    body:z.object({
        user:z.string({required_error:"The field is required."}),
        text:z.string({required_error:"The field is required."}),
       post:z.string({required_error:"The field is required."})
    })
})