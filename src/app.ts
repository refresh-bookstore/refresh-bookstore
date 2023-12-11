import * as dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import { applyMiddleware } from "./configs/middleware.config";
import { initializeMongoDB, prisma } from "./configs/database.config";
import { applyRoutes } from "./configs/routes.config";
import { applyViewEngine } from "./configs/viewEngine.config";
import { applyStaticFiles } from "./configs/static.config";

const app: Application = express();

initializeMongoDB();
applyViewEngine(app);
applyStaticFiles(app);
applyRoutes(app);
applyMiddleware(app);

export { prisma };
