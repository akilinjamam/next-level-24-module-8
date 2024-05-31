import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';

import sendRespone from '../../app/utils/sendRespone';
import { StatusCodes } from 'http-status-codes';
import { academicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const result =
      await academicDepartmentService.createAcademicDepartmentIntoDb(req.body);

    // send response

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'academic department is created successfully',
      data: result,
    });
  },
);
const getAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.getAcademicDepartmentIntoDb();

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'academic-department retrieved successfully',
    data: result,
  });
});
const getSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result =
      await academicDepartmentService.getSingleAcademicDepartmentIntoDb(id);

    // send response

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'academic-department retrieved successfully by id',
      data: result,
    });
  },
);
const updateSingleAcademicDepartment: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result =
      await academicDepartmentService.updateSingleAcademicDepartmentIntoDb(
        id,
        data,
      );

    // send response

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'academic-department updated successfully by id',
      data: result,
    });
  },
);

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartment,
  getSingleAcademicDepartment,
  updateSingleAcademicDepartment,
};
