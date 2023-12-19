import * as z from 'zod';

export const profileFormSchema = z.object({
  firstName: z.string().min(2).max(100).optional(),
  lastName: z.string().min(2).max(100).optional(),
  city: z.string().min(2).max(100).optional(),
  state: z.string().min(2).max(100).optional(),
});

export const passwordResetSchema = z.object({
  currentPassword: z.string().min(6).max(100),
  password: z.string().min(6).max(100),
  confirmPassword: z.string().min(6).max(600),
});
