import { PrismaClient, User } from "@prisma/client";
import { CreateUser } from "../dtos/user/create.user";
import { UpdateUser } from "../dtos/user/update.user";
import { UserResponse } from "../dtos/user/user.response";

const prisma = new PrismaClient();

export class UserRepository {
  async create(createUser: CreateUser): Promise<UserResponse> {
    return await prisma.user.create({
      data: {
        ...createUser,
      },
      select: {
        name: true,
        email: true,
        postalCode: true,
        address: true,
        detailAddress: true,
        phone: true,
      },
    });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await prisma.user.findUnique({
      where: { email },
    });
  }

  async findAll(): Promise<UserResponse[]> {
    return await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        postalCode: true,
        address: true,
        detailAddress: true,
        phone: true,
      },
    });
  }

  async updateByEmail(
    email: string,
    updateUser: UpdateUser
  ): Promise<UserResponse> {
    return await prisma.user.update({
      where: { email },
      data: updateUser,
      select: {
        name: true,
        email: true,
        postalCode: true,
        address: true,
        detailAddress: true,
        phone: true,
      },
    });
  }

  async deleteByEmail(email: string): Promise<void> {
    await prisma.user.delete({
      where: { email },
    });
  }
}
