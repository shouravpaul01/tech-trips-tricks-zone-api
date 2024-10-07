import { z } from "zod";

const signinValidationSchema=z.object({
    body:z.object({
        email:z.string({required_error:"The field is reuired."}).email({ message: "Enter a valid Email." }),
        password:z.string({required_error:"The field is reuired."})
    })
})

export const AuthValidations={
    signinValidationSchema
}