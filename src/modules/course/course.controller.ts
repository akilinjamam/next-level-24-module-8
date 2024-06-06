import { RequestHandler } from 'express';
import catchAsync from '../../app/utils/catchAsync';
import { courseService } from './course.service';
import { StatusCodes } from 'http-status-codes';
import sendRespone from '../../app/utils/sendRespone';

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await courseService.createCourseIntoDB(req.body);

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'faculty is created successfully',
    data: result,
  });
});
const getAllCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await courseService.getAllCourseFromDB(req.query);

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'course retrieved successfully',
    data: result,
  });
});
const getSingleCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.getSingleCourseFromDB(id);

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'course retrieved successfully by id',
    data: result,
  });
});

const deleteCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.deleteCourseFromDB(id);

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'course deleted successfully by id',
    data: result,
  });
});

const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await courseService.updateCourseFromDB(id, req.body);

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'course updated successfully by id',
    data: result,
  });
});

const assignFaculties: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseService.assignFacultieswithCourseIntoDB(
    courseId,
    faculties,
  );

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'faculty assigned successfully by id',
    data: result,
  });
});

const removeFaculties: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const { faculties } = req.body;
  const result = await courseService.removeFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );

  // send response

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'faculty rmoved successfully by id',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourse,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFaculties,
  removeFaculties,
};
