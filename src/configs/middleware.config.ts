import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sessionMiddleware from "./session.config";
import errorHandler from "../middlewares/error.handler";
import { RegisterRoutes } from "../routes/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger.json";

import productRouter from "../routes/productRouters";
import orderRouter from "../routes/orderRouters";

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
  RegisterRoutes(app);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/", productRouter);
  app.use("/", orderRouter);

  app.use("*", (req, res) => {
    res.send(`
      <script>
        alert('유효하지 않은 접근입니다.');
        location.href = "/";
      </script>
    `);
  });

  app.use(errorHandler);

  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });
};
