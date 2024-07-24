import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { AuthService } from './auth.service';
import config from '../../app/config';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, accessToken, needsPasswordChange } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'login successfull',
    data: {
      accessToken,
      needsPasswordChange,
    },
  });
});
const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthService.changePassword(req.user, passwordData);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'password changed successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'refresh token found successfully',
    data: result,
  });
});

const forgetPassword = catchAsync(async (req, res) => {
  const { id } = req.body;
  const result = await AuthService.forgetPassword(id);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'forgt password retrieved successfully',
    data: result,
  });
});
const resetPassword = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthService.resetPassword(req.body, token as string);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'password reset successfully',
    data: result,
  });
});

export const AuthController = {
  loginUser,
  changePassword,
  refreshToken,
  forgetPassword,
  resetPassword,
};
