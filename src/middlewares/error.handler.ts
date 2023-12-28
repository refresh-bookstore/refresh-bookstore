import { Request, Response, NextFunction } from "express";
import { HttpException } from "../exceptions/http.exception";
import { ValidateError } from "tsoa";
import chalk from "chalk";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const isHttpException = err instanceof HttpException;
  const isValidationError = err instanceof ValidateError;
  const status = err.statusCode || (isValidationError ? 422 : 500);
  const env = process.env.NODE_ENV || "development";

  if (req.path === "/login/status" && status >= 400) {
    return next();
  }

  const currentTime = new Date().toISOString();
  const endpoint = req.originalUrl;
  const clientIp = req.ip;

  const colorTime = chalk.cyanBright(currentTime);
  const colorStatus = status >= 500 ? chalk.red(status) : chalk.yellow(status);
  const colorEndpoint = chalk.greenBright(endpoint);
  const colorIp = chalk.blueBright(`IP: ${clientIp}`);
  const colorError = chalk.whiteBright(`- ${err.message}`);

  const logMessage = `🚨 ${colorTime} ${colorStatus} ${colorEndpoint} ${colorIp} ${colorError}`;

  if (env === "development") {
    console.log(chalk.yellow(logMessage));
  } else {
    console.error(chalk.red(logMessage));
  }

  const clientMessage = isValidationError
    ? "입력 값이 유효하지 않습니다."
    : isHttpException
      ? err.message
      : status >= 500 || status === 403
        ? "서버 내부 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
        : "유효하지 않은 요청입니다.";

  if (status >= 500 || status === 403) {
    res.status(status).send(`
          <script>
              alert("${clientMessage.replace(/"/g, '\\"')}");
              localStorage.clear();
              location.href = "/";
          </script>
      `);
  } else {
    res.status(status).send({ message: clientMessage });
  }
};
/* eslint-enable @typescript-eslint/no-explicit-any */

export default errorHandler;
