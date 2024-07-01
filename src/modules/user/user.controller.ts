/* eslint-disable @typescript-eslint/no-unused-vars */
import { RequestHandler } from 'express';
import { userService } from './user.service';
import sendRespone from '../../app/utils/sendRespone';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res, next) => {
  const { students: studentData, password } = req.body;
  const result = await userService.createStudentIntoDb(
    req.file,
    password,
    studentData,
  );

  // // send response
  // console.log('file:', req.file);
  // console.log('data:', req.body);
  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'user is created successfully',
    data: result,
  });
});

const createFaculty = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await userService.createFacultyIntoDB(
    req.file,
    password,
    facultyData,
  );

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

const createAdmin = catchAsync(async (req, res) => {
  const { password, admin: adminData } = req.body;
  console.log('admin');

  const result = await userService.createAdminIntoDB(
    req.file,
    password,
    adminData,
  );

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId, role } = req.user;

  // if (!token) {
  //   throw new AppError(StatusCodes.NOT_FOUND, 'Token not found!');
  // }

  const result = await userService.getMe(userId, role);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: `${role} is retrieved succesfully`,
    data: result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userService.changeStatus(id, req.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'user status changed successfully',
    data: result,
  });
});

export const userController = {
  createStudent,
  createAdmin,
  createFaculty,
  getMe,
  changeStatus,
};
