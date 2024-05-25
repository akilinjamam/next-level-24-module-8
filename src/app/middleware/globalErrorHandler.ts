import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const message = err.message || 'something went wrong';

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message,
    error: err,
  });
};

export default globalErrorHandler;
