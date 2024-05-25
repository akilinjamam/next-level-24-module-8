import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'api not found !!',
    error: '',
  });
};

export default notFoundRoute;
