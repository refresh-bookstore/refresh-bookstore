import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import cron from "node-cron";
import { PrismaClient } from "@prisma/client";
import { RegisterRoutes } from "../routes/routes";
import { BookStorageService } from "../services/book.storage.service";
import sessionMiddleware from "./session.config";
import errorHandler from "../middlewares/error.handler";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger.json";
import chalk from "chalk";

export const prisma = new PrismaClient();
const bookStorageService = new BookStorageService();

export const applyMiddleware = (app: express.Application) => {
  app.use(cookieParser());
  app.use(express.json());
  app.use(compression());
  app.use(
    logger("combined", {
      skip: (_req, res: { statusCode: number }) => res.statusCode < 400,
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(sessionMiddleware);
  RegisterRoutes(app);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  cron.schedule(
    "10 12 * * *",
    async () => {
      console.log("매일 정오 작업을 실행합니다.");
      await bookStorageService.fetchDataAndStore();
    },
    {
      scheduled: true,
      timezone: "Asia/Seoul",
    }
  );

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
