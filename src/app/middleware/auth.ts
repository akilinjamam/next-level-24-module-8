import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../../modules/user/user.interface';
import User from '../../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  // console.log('auth', requiredRoles);
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'un-authorized');
    }

    const { role, userId, iat } = decoded;

    const isUserExists = await User.isUserExistsByCustomId(userId);

    if (!isUserExists) {
      throw new AppError(StatusCodes.NOT_FOUND, 'user not found');
    }
    const isDeleted = isUserExists.isDeleted;

    if (isDeleted) {
      throw new AppError(StatusCodes.FORBIDDEN, 'user is deleted');
    }

    const userStatus = isUserExists.status;

    if (userStatus === 'blocked') {
      throw new AppError(StatusCodes.FORBIDDEN, 'user is blocked');
    }
    // checking if password is changed or not
    if (
      isUserExists?.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        isUserExists?.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        'You are not authorized  hi!',
      );
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
