import { UserRepository } from "../repositories/user.repository";
import { User } from "@prisma/client";
import { CreateUser } from "../dtos/user/create.user";
import { UpdateUser } from "../dtos/user/update.user";
import { UserResponse } from "../dtos/user/user.response";
import argon2 from "argon2";
import { LoginDTO } from "../dtos/user/login.dto";

export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  public async createUser(createUser: CreateUser): Promise<UserResponse> {
    const isUser = await this.userRepository.findByEmail(createUser.email);

    if (isUser) {
      throw new Error("이미 사용 중인 이메일입니다.");
    }

    const hashedPassword = await argon2.hash(createUser.password);
    const userData = {
      ...createUser,
      password: hashedPassword,
    };
    return await this.userRepository.create(userData);
  }

  public async getUser(email: string): Promise<UserResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    return {
      name: user.name,
      email: user.email,
      address: user.address,
      detailAddress: user.detailAddress,
      postalCode: user.postalCode,
      phone: user.phone,
    };
  }

  public async getUsers(): Promise<UserResponse[]> {
    return await this.userRepository.findAll();
  }

  public async updateUserByEmail(
    email: string,
    updateUser: UpdateUser
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(updateUser.password);

    const updateUserWithHashedPassword = {
      ...updateUser,
      password: hashedPassword,
    };

    const updatedUser = await this.userRepository.updateByEmail(
      email,
      updateUserWithHashedPassword
    );

    return updatedUser;
  }

  public async deleteUser(loginDTO: LoginDTO): Promise<void> {
    const user = await this.userRepository.findByEmail(loginDTO.email);

    if (!user) {
      throw new Error("사용자를 찾을 수 없습니다.");
    }

    const isValidPassword = await argon2.verify(
      user.password,
      loginDTO.password
    );

    if (!isValidPassword) {
      throw new Error("비밀번호를 확인해주세요.");
    }

    return await this.userRepository.deleteByEmail(loginDTO.email);
  }

  async login(loginDTO: LoginDTO): Promise<User> {
    const user = await this.userRepository.findByEmail(loginDTO.email);

    if (!user) {
      throw new Error("이메일 주소를 확인해주세요.");
    }

    const isValidPassword = await argon2.verify(
      user.password,
      loginDTO.password
    );

    if (!isValidPassword) {
      throw new Error("비밀번호를 확인해주세요.");
    }

    return user;
  }
}
