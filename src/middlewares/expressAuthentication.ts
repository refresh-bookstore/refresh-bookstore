import { Request as ExpressRequest, Response } from "express";
import { Session, SessionData } from "express-session";
import { IUser } from "src/interfaces/IUser";
import User from "../models/User";

interface Request extends ExpressRequest {
  session: Session & Partial<SessionData>;
  user?: IUser;
}

export async function expressAuthentication(
  request: Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (!request.session || !request.session.user) {
    return Promise.reject(new Error("세션 또는 사용자를 찾을 수 없습니다."));
  }

  try {
    const user = await User.findOne({ email: request.session.user.email });
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
