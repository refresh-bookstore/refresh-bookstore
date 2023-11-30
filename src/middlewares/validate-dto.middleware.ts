import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export function validateDto(dtoClass: any) {
  return (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(dtoClass, req.body);
    validate(dtoObj).then((errors) => {
      if (errors.length > 0) {
        const message = errors
          .map((error) => Object.values(error.constraints))
          .join(", ");
        res.status(400).json({ message });
      } else {
        next();
      }
    });
  };
}
