import * as z from "zod";

export const signUpFormSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
    confirmPassword: z.string().min(6).max(600),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password don't match",
  });

export const signInFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export const forgetPasswordFormSchema = z.object({
  email: z.string().email(),
});

export const defaultSignUpFormValues = {
  email: "",
  password: "",
};

export const defaultSignInFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
};

export const defaultForgetPasswordFormValues = {
  email: "",
};
