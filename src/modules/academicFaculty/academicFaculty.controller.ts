import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { academicFacultyService } from './academicFaculty.service';
import sendRespone from '../../app/utils/sendRespone';
import { StatusCodes } from 'http-status-codes';

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicFacultyService.createAcademicFacultyIntoDb(
    req.body,
  );

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'faculty is created successfully',
    data: result,
  });
});
const getAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAcademicFacultyIntoDb(
    req.query,
  );

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'academic-faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const result =
      await academicFacultyService.getSingleAcademicFacultyIntoDb(id);

    // send response

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'academic-faculty retrieved successfully by id',
      data: result,
    });
  },
);
const updateSingleAcademicFaculty: RequestHandler = catchAsync(
  async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const result =
      await academicFacultyService.updateSingleAcademicFacultyIntoDb(id, data);

    // send response

    sendRespone(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: 'academic-faculty updated successfully by id',
      data: result,
    });
  },
);

export const AcademicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculty,
  getSingleAcademicFaculty,
  updateSingleAcademicFaculty,
};
