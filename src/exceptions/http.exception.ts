export class HttpException extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(400, message);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(401, message);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(403, message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(404, message);
  }
}

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(409, message);
  }
}

export class InternalServerErrorException extends HttpException {
  constructor(message: string) {
    super(500, message || "내부 서버 오류가 발생했습니다.");
  }
}
