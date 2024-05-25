import { NextFunction, Request, Response } from 'express';
import { StdudentService } from './student.service';
import studentValidationSchema from './student.validation';
import studentZodSchema from './student.zodvalidation';
import sendRespone from '../../app/utils/sendRespone';
import { StatusCodes } from 'http-status-codes';

const getAllStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await StdudentService.getAllStudentIntoDb();

    // send response;

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;

    const result = await StdudentService.getSingleStudentIntoDb(studentId);

    // send response;

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'student is retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const deletedStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { studentId } = req.params;

    const result = await StdudentService.dleteStudentIntoDb(studentId);

    // send response;

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'student deleted successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const studentControllers = {
  getAllStudent,
  getSingleStudent,
  deletedStudent,
};
