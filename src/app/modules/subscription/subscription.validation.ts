import { z } from "zod";

export const subscriptionValidationSchema=z.object({
    body:z.object({
        plan:z.string({required_error:"The field is required."}),
        amount:z.number({required_error:"The field is required."})
    })
})