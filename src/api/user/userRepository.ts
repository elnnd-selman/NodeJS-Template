import type { User } from "@/api/user/userModel";
import { UserSchema } from "@/api/user/userModel"; // Assuming UserSchema is defined in userModel.ts
import { PrismaClient } from "@prisma/client";
import type { z } from "zod";

const prisma = new PrismaClient();

export class UserRepository {
  async findAllAsync(): Promise<User[]> {
    const users = await prisma.user.findMany();
    return users;
  }

  async createUser(data: z.infer<typeof UserSchema>): Promise<User> {
    // Validate the incoming data using zod schema
    const result = UserSchema.safeParse(data);

    if (!result.success) {
      // Handle validation errors
      throw new Error(`Validation errors: ${JSON.stringify(result.error.errors)}`);
    }

    const validatedData = result.data;

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        email: validatedData.email,
        username: validatedData.username,
        age: validatedData.age,
        emailVerified: validatedData.emailVerified,
        password: validatedData.password,
        createdAt: validatedData.createdAt,
        updatedAt: validatedData.updatedAt,
        roleId: validatedData.roleId,
      },
    });

    return newUser;
  }
}
