import { Request as ExpressRequest } from "express";
import { Session, SessionData } from "express-session";
import { UserRepository } from "../repositories/user.repository";
import { User } from "@prisma/client";

export interface Request extends ExpressRequest {
  session: Session & Partial<SessionData>;
  user?: User;
}

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (!request.session || !request.session.user) {
    return Promise.reject(new Error("세션 또는 사용자를 찾을 수 없습니다."));
  }

  const userRepository = new UserRepository();

  try {
    const user = await userRepository.findByEmail(request.session.user.email);
    if (!user) {
      return Promise.reject(
        new Error("데이터베이스에서 일치하는 사용자를 찾을 수 없습니다.")
      );
    }

    if (securityName === "isAdmin" && !user.isAdmin) {
      return Promise.reject(new Error("허용되지 않은 요청입니다."));
    }

    request.user = user;
    return Promise.resolve(user);
  } catch (err) {
    return Promise.reject(err);
  }
}
