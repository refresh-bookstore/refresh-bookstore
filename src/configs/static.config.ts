import { Application } from "express";
import express from "express";
import path from "path";

export const applyStaticFiles = (app: Application) => {
  app.use(express.static(path.join(__dirname, "../views/home")));
  app.use(
    express.static(path.join(__dirname, "../views"), {
      setHeaders: (res, path) => {
        if (path.endsWith(".css")) {
          res.set("Content-Type", "text/css");
        }
      },
    })
  );
};
