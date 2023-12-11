import { Request as ExpressRequest } from "express";
import { Session, SessionData } from "express-session";
import { UserRepository } from "../repositories/user.repository";
import {
  ForbiddenException,
  InternalServerErrorException,
  NotFoundException,
} from "../exceptions/http.exception";

export interface Request extends ExpressRequest {
  session: Session & Partial<SessionData>;
}

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (!request.session || !request.session.email) {
    return Promise.reject(new ForbiddenException("유효하지 않은 접근입니다."));
  }

  const userRepository = new UserRepository();

  try {
    const user = await userRepository.findByEmail(request.session.email);
    if (!user) {
      return Promise.reject(
        new NotFoundException("사용자를 찾을 수 없습니다.")
      );
    }

    if (securityName === "isAdmin" && !user.isAdmin) {
      return Promise.reject(new ForbiddenException("접근 권한이 없습니다."));
    }
    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(new InternalServerErrorException(err.message));
  }
}
