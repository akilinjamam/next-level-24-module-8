import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../app/errors/AppError';
import User from '../user/user.model';
import { TLoginUser, TPasswordChange } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../app/config';
import bcrypt from 'bcrypt';
import { createToken, verifyToken } from './auth.utils';
import { sendEmail } from '../../app/utils/sendEmail';

const loginUser = async (body: TLoginUser) => {
  const isUserExists = await User.isUserExistsByCustomId(body?.id);

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found');
  }
  const isDeleted = isUserExists.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found');
  }

  const userStatus = isUserExists.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.NOT_FOUND, 'user is blocked');
  }

  const isPasswordMatched = await User.isPasswordExists(
    body?.password,
    isUserExists.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.OK, 'password did not matched');
  }

  // create token and sent to the client:

  const jwtPayload = {
    userId: isUserExists?.id,
    role: isUserExists?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as string,
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expiresIn as string,
  );
  return {
    accessToken,
    refreshToken,
    needsPasswordChange: isUserExists?.needsPasswordChange,
  };
};

const changePassword = async (
  user: JwtPayload,
  payload: Partial<TPasswordChange>,
) => {
  const isUserExists = await User.isUserExistsByCustomId(user?.userId);
  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Admin not found');
  }
  const isDeleted = isUserExists.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Admin not found');
  }

  const userStatus = isUserExists.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.NOT_FOUND, 'Admin is blocked');
  }

  const isPasswordMatched = await User.isPasswordExists(
    payload.oldPassword as string,
    isUserExists.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.OK, 'password did not matched');
  }

  // hasing new password

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword as string,
    Number(config.bcrypt_salt_round),
  );

  // console.log('hashed:', newHashedPassword);
  // console.log(user?.userId, user?.role);

  const result = await User.findOneAndUpdate(
    {
      id: user.userId,
      role: user.role,
    },
    {
      password: newHashedPassword,
      needsPasswordChange: false,
      passwordChangedAt: new Date(),
    },
  );
  console.log('result:', result);

  return null;
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
  }

  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const { userId, iat } = decoded;

  const isUserExists = await User.isUserExistsByCustomId(userId);

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found');
  }
  // checking if the user already deleted
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

  const jwtPayload = {
    userId: isUserExists?.id,
    role: isUserExists?.role,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as string,
  );

  return {
    accessToken,
  };
};

const forgetPassword = async (userId: string) => {
  const isUserExists = await User.isUserExistsByCustomId(userId);

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found');
  }
  // checking if the user already deleted
  const isDeleted = isUserExists.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'user is deleted');
  }

  const userStatus = isUserExists.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'user is blocked');
  }

  const jwtPayload = {
    userId: isUserExists?.id,
    role: isUserExists?.role,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const resetUILink = `${config.reset_pass_ui_link}?id=${isUserExists.id}&token=${resetToken}`;

  sendEmail(isUserExists?.email, resetUILink);

  console.log(resetUILink);
};
const resetPassword = async (
  payload: { id: string; newPassword: string },
  token: string,
) => {
  const isUserExists = await User.isUserExistsByCustomId(payload.id);

  if (!isUserExists) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found');
  }
  // checking if the user already deleted
  const isDeleted = isUserExists.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'user is deleted');
  }

  const userStatus = isUserExists.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'user is blocked');
  }

  const decoded = jwt.verify(
    token,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  // const { userId, iat } = decoded;
  console.log(decoded);

  if (payload.id !== decoded.userId) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'user id did not matched. you are forbidden',
    );
  }

  const newHashedPassword = await bcrypt.hash(
    payload.newPassword as string,
    Number(config.bcrypt_salt_round),
  );

  const result = await User.findOneAndUpdate(
    {
      id: decoded.userId,
      role: decoded.role,
    },
    {
      password: newHashedPassword,
    },
  );

  console.log(result);
};

export const AuthService = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
