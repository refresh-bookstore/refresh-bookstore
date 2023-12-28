import { Application } from "express";
import path from "path";
import ejs from "ejs";

export const applyViewEngine = (app: Application) => {
  app.set("views", path.join(__dirname, "../views"));
  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");
};
