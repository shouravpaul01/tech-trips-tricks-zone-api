import { z } from "zod";

const signinValidationSchema=z.object({
    body:z.object({
        email:z.string({required_error:"The field is reuired."}).email({ message: "Enter a valid Email." }),
        password:z.string({required_error:"The field is reuired."})
    })
})
const changePasswordValidationSchema=z.object({
    body:z.object({
        email:z.string({required_error:"The field is reuired."}).email({ message: "Enter a valid Email." }),
        oldPassword:z.string({required_error:"The field is reuired."}).min(6,{message:"Password must be six characters."}),
        password:z.string({required_error:"The field is reuired."}).min(6,{message:"Password must be six characters."})
    })
})
export const AuthValidations={
    signinValidationSchema,
    changePasswordValidationSchema
}