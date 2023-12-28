import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { PrismaClient } from "@prisma/client";
import { RegisterRoutes } from "../routes/routes";
import sessionMiddleware from "./session.config";
import errorHandler from "../middlewares/error.handler";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger.json";
import chalk from "chalk";

export const prisma = new PrismaClient();

export const applyMiddleware = (app: express.Application) => {
  app.use(cookieParser());
  app.use(express.json());
  app.use(compression());
  app.use(
    logger("combined", {
      skip: (_req, res: { statusCode: number }) => res.statusCode < 400,
    }),
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(sessionMiddleware);
  RegisterRoutes(app);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.use("*", (_req, res) => {
    res.send(`
      <script>
        alert('유효하지 않은 접근입니다.');
        location.href = "/";
      </script>
    `);
  });

  app.use(errorHandler);

  app.listen(process.env.PORT, () => {
    console.log(chalk.green(`🚀 Server started on port ${process.env.PORT}`));
  });
};
