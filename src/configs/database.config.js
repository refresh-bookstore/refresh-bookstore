import mongoose from "mongoose";
import { PrismaClient } from "@prisma/client";

export const initializeMongoDB = () => {
  mongoose.set("strictQuery", false);
  mongoose.connect(process.env.SERVER_LINK);
};

export const prisma = new PrismaClient();
