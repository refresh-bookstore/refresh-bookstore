import { Request as ExpressRequest } from "express";
import { Session, SessionData } from "express-session";
import { UserRepository } from "../repositories/user.repository";
import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from "../exceptions/http.exception";
import { User } from "@prisma/client";

export interface Request extends ExpressRequest {
  session: Session & Partial<SessionData> & { email?: string };
}

export async function expressAuthentication(
  request: Request,
  securityName: string,
  _scopes?: string[]
): Promise<User | void> {
  if (!request.session || !request.session.email) {
    throw new ForbiddenException("유효하지 않은 접근입니다.");
  }

  const userRepository = new UserRepository();

  try {
    const user = await userRepository.findByEmail(request.session.email);
    if (!user) {
      throw new NotFoundException("사용자를 찾을 수 없습니다.");
    }

    if (securityName === "isAdmin" && !user.isAdmin) {
      throw new ForbiddenException("접근 권한이 없습니다.");
    }
    return user;
  } catch (err) {
    throw new InternalServerErrorException(err.message);
  }
}
