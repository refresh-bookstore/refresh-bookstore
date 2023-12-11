import { PrismaClient, User } from "@prisma/client";
import { CreateUser } from "../dtos/user/create.user";
import { UpdateUser } from "../dtos/user/update.user";

const prisma = new PrismaClient();

export class UserRepository {
  async create(createUser: CreateUser): Promise<User> {
    return await prisma.user.create({
      data: {
        ...createUser,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return await prisma.user.findMany();
  }

  async updateByEmail(email: string, updateUser: UpdateUser): Promise<User> {
    return await prisma.user.update({
      where: {
        email: email,
      },
      data: updateUser,
    });
  }

  async deleteByEmail(email: string): Promise<User> {
    return await prisma.user.delete({
      where: {
        email: email,
      },
    });
  }
}
