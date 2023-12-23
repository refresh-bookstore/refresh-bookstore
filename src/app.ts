import * as dotenv from "dotenv";
dotenv.config();

import express, { Application } from "express";
import { applyMiddleware, prisma } from "./configs/middleware.config";
import { applyViewEngine } from "./configs/viewEngine.config";
import { applyStaticFiles } from "./configs/static.config";

const app: Application = express();

applyViewEngine(app);
applyStaticFiles(app);
applyMiddleware(app);

export { prisma };
