import { Application } from "express";
import path from "path";

export const applyViewEngine = (app: Application) => {
  app.set("views", path.join(__dirname, "../views"));
  app.engine("html", require("ejs").renderFile);
  app.set("view engine", "html");
};
