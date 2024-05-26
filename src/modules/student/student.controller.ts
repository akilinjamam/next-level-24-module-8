import { RequestHandler } from 'express';
import { StdudentService } from './student.service';

import sendRespone from '../../app/utils/sendRespone';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';

const getAllStudent: RequestHandler = catchAsync(async (req, res) => {
  const result = await StdudentService.getAllStudentIntoDb();

  // send response;

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'student is retrieved successfully',
    data: result,
  });
});

const getSingleStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;

  const result = await StdudentService.getSingleStudentIntoDb(studentId);

  // send response;

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'student is retrieved successfully',
    data: result,
  });
});
const deletedStudent: RequestHandler = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  const result = await StdudentService.dleteStudentIntoDb(studentId);

  // send response;

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'student deleted successfully',
    data: result,
  });
});

export const studentControllers = {
  getAllStudent,
  getSingleStudent,
  deletedStudent,
};
