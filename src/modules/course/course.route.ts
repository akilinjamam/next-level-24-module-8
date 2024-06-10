import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../app/middleware/validateSchema';
import { courseValidations } from './course.validation';
import auth from '../../app/middleware/auth';

const router = express.Router();

router.post(
  '/create-course',
  auth('admin'),
  validateRequest(courseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/', CourseController.getAllCourse);
router.get(
  '/:id',
  auth('student', 'faculty', 'admin'),
  CourseController.getSingleCourse,
);
router.delete('/:id', CourseController.deleteCourse);
router.patch(
  '/:id',
  auth('admin'),
  validateRequest(courseValidations.updateCourseValidationSchema),
  CourseController.updateCourse,
);
router.put(
  '/:courseId/assign-faculties',
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  CourseController.assignFaculties,
);
router.delete(
  '/:courseId/remove-faculties',
  auth('admin'),
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFaculties,
);

export const CourseRouter = router;
