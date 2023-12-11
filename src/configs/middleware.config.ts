import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sessionMiddleware from "./session.config";
import errorHandler from "../middlewares/error.handler";

export const applyMiddleware = (app: express.Application) => {
  app.use(cookieParser());
  app.use(express.json());
  app.use(
    logger("combined", {
      skip: (req, res) => res.statusCode < 400,
    })
  );
  app.use(express.urlencoded({ extended: true }));
  app.use(sessionMiddleware);
  app.use(errorHandler);

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
};
