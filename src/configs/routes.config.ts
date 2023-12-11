import { Application } from "express";
import { RegisterRoutes } from "../routes/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger/swagger.json";

import productRouter from "../routes/productRouters";
import orderRouter from "../routes/orderRouters";

export const applyRoutes = (app: Application) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use("/", productRouter);
  app.use("/", orderRouter);
  RegisterRoutes(app);

  app.use("*", (req, res) => {
    res.send(`
      <script>
        alert('유효하지 않은 접근입니다.');
        location.href = "/";
      </script>
    `);
  });
};
