import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type User = z.infer<typeof UserSchema>;
export const UserSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  username: z.string(),
  age: z.number().nullable(),
  emailVerified: z.boolean(),
  password: z.string().min(8),
  createdAt: z.date(),
  updatedAt: z.date(),
  roleId: z.number(),
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
  params: z.object({ id: commonValidations.id }),
});
