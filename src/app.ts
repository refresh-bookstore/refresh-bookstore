import express, { Application, Request, Response, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { RegisterRoutes } from "./routes/routes";
import productRouter from "./routes/productRouters";
import orderRouter from "./routes/orderRouters";
import sessionMiddleware from "./middlewares/session";

const app: Application = express();
const prisma = new PrismaClient();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.SERVER_LINK);

app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");
app.use(cookieParser());
app.use(express.json());
app.use(
  logger("combined", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(sessionMiddleware);

app.use(express.static(path.join(__dirname, "views/home")));
app.use(
  express.static(path.join(__dirname, "/views"), {
    setHeaders: (res, path, stat) => {
      if (path.endsWith(".css")) {
        res.set("Content-Type", "text/css");
      }
    },
  })
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/", productRouter);
app.use("/", orderRouter);
RegisterRoutes(app);

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Received request: ${req.method} ${req.url}`);
  next();
});

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const env = req.app.get("env");
  let logMessage = chalk.red(`[${status}] ${err.message}`);

  if (status === 401) {
    logMessage = chalk.yellow(logMessage); // 401 상태 코드에 대한 로그는 노란색으로 표시
    res.render("error-page/login-required.html");
  } else {
    res.locals.message = err.message;
    res.locals.error = env === "development" ? err : {};
    res.status(status).render("error");
  }

  console.log(logMessage);
});

app.listen(process.env.PORT, () => {
  console.log("Server started on port " + process.env.PORT);
});

export { prisma };
