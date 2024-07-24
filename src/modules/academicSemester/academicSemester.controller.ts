import { RequestHandler } from 'express';

import sendRespone from '../../app/utils/sendRespone';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import { academicSemesterService } from './academicSemester.service';

const createAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicSemesterService.createAcademicSemesterIntoDb(
    req.body,
  );

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'academic semester is created successfully',
    data: result,
  });
});
const getAcademicSemester: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicSemesterService.getAcademicSemesterIntoDb(
    req.query,
  );

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'academic-semester retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleAcademicSemester: RequestHandler = catchAsync(
  async (req, res) => {
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
  async (req, res) => {
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
