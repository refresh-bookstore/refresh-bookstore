import argon2 from "argon2";
import { User } from "@prisma/client";
import { UserRepository } from "../repositories/user.repository";
import { CreateUser } from "../dtos/user/create.user";
import { UpdateUser } from "../dtos/user/update.user";
import { UserResponse } from "../dtos/user/user.response";
import { LoginDTO } from "../dtos/user/login.dto";
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "../exceptions/http.exception";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserOrThrow(email: string): Promise<User> {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new NotFoundException(`해당 이메일의 사용자는 존재하지 않습니다.`);
    }
    return user;
  }

  private async isValidPassword(
    password: string,
    dbpassword: string
  ): Promise<boolean> {
    const isValidPassword = await argon2.verify(password, dbpassword);

    if (!isValidPassword) {
      throw new BadRequestException("비밀번호를 확인해주세요.");
    }

    return isValidPassword;
  }

  async createUser(createUser: CreateUser): Promise<void> {
    const isExisting = await this.userRepository.findByEmail(createUser.email);

    if (isExisting) {
      throw new ConflictException(
        `${createUser.email}은(는) 이미 사용 중입니다.`
      );
    }

    const hashedPassword = await argon2.hash(createUser.password);

    const userData = {
      ...createUser,
      password: hashedPassword,
    };

    const createdData = await this.userRepository.create(userData);

    if (!createdData) {
      throw new InternalServerErrorException(
        "회원가입 중 오류가 발생했습니다."
      );
    }
  }

  async getUser(email: string): Promise<UserResponse> {
    const user = await this.getUserOrThrow(email);
    return new UserResponse(user);
  }

  async getUsers(): Promise<UserResponse[]> {
    const users = await this.userRepository.findAll();
    return users.map((user) => new UserResponse(user));
  }

  async updateUserByEmail(
    email: string,
    updateUser: UpdateUser
  ): Promise<void> {
    await this.getUserOrThrow(email);

    const hashedPassword = await argon2.hash(updateUser.password);

    const updateUserWithHashedPassword = {
      ...updateUser,
      password: hashedPassword,
    };

    const updatedData = await this.userRepository.updateByEmail(
      email,
      updateUserWithHashedPassword
    );

    if (!updatedData) {
      throw new InternalServerErrorException("사용자 업데이트에 실패했습니다.");
    }
  }

  async deleteUser(loginDTO: LoginDTO): Promise<void> {
    const user = await this.getUserOrThrow(loginDTO.email);

    await this.isValidPassword(user.password, loginDTO.password);

    const deleteUser = await this.userRepository.deleteByEmail(loginDTO.email);
    if (!deleteUser) {
      throw new InternalServerErrorException("사용자 탈퇴에 실패했습니다.");
    }
  }

  async login(loginDTO: LoginDTO): Promise<string> {
    const user = await this.getUserOrThrow(loginDTO.email);

    await this.isValidPassword(user.password, loginDTO.password);

    return user.email;
  }
}
