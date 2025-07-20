// src/lib/validations/register-user-schema.ts

import { z } from 'zod'

export const registerUserSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Minimum 6 characters'),
  role: z.enum(['admin', 'moderator', 'support', 'inspector'])
})

export type RegisterUserFormValues = z.infer<typeof registerUserSchema>
