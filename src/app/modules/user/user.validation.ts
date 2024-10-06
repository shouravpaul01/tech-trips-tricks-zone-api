import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name:z.string().nonempty("The field is required."),
    email:z.string().nonempty("The field is required.").email({message:"Enter a valid Email."}),
    gender:z.string().nonempty("The field is required."),
    password:z.string().nonempty("The field is required.").min(6,{message:"Password mus be six charecters."}),
  }),
});
export const UserValidations = {
  createUserValidationSchema,
};
