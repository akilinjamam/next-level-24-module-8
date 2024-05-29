import { NextFunction, Request, RequestHandler, Response } from 'express';

import sendRespone from '../../app/utils/sendRespone';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await academicSemesterService.createAcademicSemesterIntoDb(
      req.body,
    );

    // send response

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'user is created successfully',
      data: result,
    });
  },
);
const getAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const result = await academicSemesterService.getAcademicSemesterIntoDb();

    // send response

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'academic-semester retrieved successfully',
      data: result,
    });
  },
);
const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const result =
      await academicSemesterService.getSingleAcademicSemesterIntoDb(id);

    // send response

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'academic-semester retrieved successfully by id',
      data: result,
    });
  },
);
const updateSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res, next) => {
    const { id } = req.params;
    const data = req.body;
    const result =
      await academicSemesterService.updateSingleAcademicSemesterIntoDb(
        id,
        data,
      );

    // send response

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'academic-semester updated successfully by id',
      data: result,
    });
  },
);

export const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemester,
  getSingleAcademicSemester,
  updateSingleAcademicSemester,
};
