import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string({required_error:"The field is required."}),
    email: z
      .string({required_error:"The field is required."})
      .email({ message: "Enter a valid Email." }),
    gender: z.string({required_error:"The field is required."}),
    dateOfBirth: z
      .string({required_error:"The field is required."})
      .refine(
        (value) => {
          const date = new Date(value);
          return !isNaN(date.getTime());
        },
        {
          message: "Invalid date format",
        }
      ),
    password: z
      .string({required_error:"The field is required."})
      .min(6, { message: "Password mus be six charecters." }),
  }),
});
export const UserValidations = {
  createUserValidationSchema,
};
