import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../app/middleware/validateSchema';
import { courseValidations } from './course.validation';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-course',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(courseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get(
  '/',
  auth('student', 'faculty', 'admin', 'superAdmin'),
  CourseController.getAllCourse,
);
router.get(
  '/:id',
  auth('student', 'faculty', 'admin', 'superAdmin'),
  CourseController.getSingleCourse,
);
router.delete(
  '/:id',
  auth('admin', 'superAdmin'),
  CourseController.deleteCourse,
);
router.patch(
  '/:id',
  auth('admin', 'superAdmin'),
  validateRequest(courseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  auth('admin', 'superAdmin'),
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignFaculties,
);
router.get(
  '/:courseId/get-faculties',
  auth('admin', 'superAdmin', 'faculty', 'student'),
  CourseController.getFacultiesWithCourse,
);
router.delete(
  '/:courseId/remove-faculties',
  auth('admin', 'superAdmin'),
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFaculties,
);

export const CourseRouter = router;
