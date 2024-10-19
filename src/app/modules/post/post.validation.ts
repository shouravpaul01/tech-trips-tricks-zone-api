import { z } from "zod";

export const postValidation=z.object({
    body:z.object({
        type:z.string({required_error:"The field is required."}),
        category:z.string({required_error:"The field is required."}),
        content:z.string({required_error:"The field is required."})
    })
})