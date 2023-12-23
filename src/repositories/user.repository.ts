import { PrismaClient, User } from "@prisma/client";
import { CreateUser } from "../dtos/user/create.user";
import { UpdateUser } from "../dtos/user/update.user";

const prisma = new PrismaClient();

interface UserContext {
  user: {
    findUnique: PrismaClient["user"]["findUnique"];
  };
}

export class UserRepository {
  private context: UserContext;

  constructor() {
    this.context = { user: prisma.user };
  }

  async create(createUser: CreateUser): Promise<User> {
    return await prisma.user.create({
      data: {
        ...createUser,
      },
    });
  }

  async findByEmail(
    email: string,
    context: UserContext = this.context
  ): Promise<User | null> {
    return await context.user.findUnique({
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
