import { Request } from "express";
import { File } from "multer";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      files?: File[];
    }
  }
}
