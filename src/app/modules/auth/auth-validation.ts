import { string, z } from "zod";

const loginValidation = z.object({
  body: z.object({
    email: string(),
    password: string(),
  }),
});


const forgetPasswordValidation = z.object({
  body:z.object({
    email:string()
  })
})

export const AuthValidations = {
  loginValidation, 
  forgetPasswordValidation,
}