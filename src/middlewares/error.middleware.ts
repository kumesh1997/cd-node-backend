import { NextFunction, Request, Response } from "express";

const errorMiddleware = (err: Error, req: Request, res: Response,  next: NextFunction): void => {
  let statusCode = 500;
  let errorMessage = "INTERNAL_SERVER_ERROR";

  if (err instanceof CustomError) {
    statusCode = err.statusCode;
    errorMessage = err.message;
  }

  // Send the error response
  res.status(statusCode).json({ status: false, message: errorMessage, description: err?.message });
  next();
};

class CustomError extends Error {
  constructor(
    // eslint-disable-next-line no-unused-vars
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export { errorMiddleware, CustomError };
