import express, { Application, Request, Response, NextFunction } from "express";
import path from "path";
import logger from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import createError from "http-errors";
import * as dotenv from "dotenv";
dotenv.config();

import { RegisterRoutes } from "./routes/routes";
import homeRouter from "./routes/homeRouter";
import usersRouter from "./routes/userRouters";
import pageRouter from "./routes/pageRouters";
import productRouter from "./routes/productRouters";
import orderRouter from "./routes/orderRouters";

import sessionMiddleware from "./middlewares/session";
import hashPassword from "./middlewares/hashPassword";

const app: Application = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.SERVER_LINK);

// 애플리케이션 설정
// 뷰 엔진 설정
app.set("views", path.join(__dirname, "views"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

// 미들웨어 설정
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(sessionMiddleware);

// 정적 파일 경로 설정
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

RegisterRoutes(app);
app.use("/", homeRouter);
app.use("/", usersRouter);
app.use("/", pageRouter);
app.use("/", productRouter);
app.use("/", orderRouter);

// 에러 핸들링
// 404 에러 핸들링
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// 전체 에러 핸들링
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  if (err.status === 401) {
    res.render("error-page/login-required.html");
  }
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

app.use(hashPassword);

// 서버 시작
app.listen(process.env.PORT, () => {
  console.log(`Server started on port 3000`);
});
