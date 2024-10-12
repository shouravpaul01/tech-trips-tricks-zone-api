import { z } from "zod";

export const postValidation=z.object({
    body:z.object({
        category:z.string({required_error:"The field is required."}),
        content:z.string({required_error:"The field is required."})
    })
})