import express from 'express';
import auth from '../../app/middleware/auth';
import validateRequest from '../../app/middleware/validateSchema';
import { EnrolledCourseValidations } from './enrolledCourse.zodvalidation';
import { EnrolledCourseControllers } from './enrolledCourse.controller';

const router = express.Router();

router.post(
  '/create-enrolled-course',
  auth('student'),
  validateRequest(
    EnrolledCourseValidations.createEnrolledCourseValidationZodSchema,
  ),
  EnrolledCourseControllers.createEnrolledCourse,
);
router.get(
  '/my-enrolled-course',
  auth('student'),
  EnrolledCourseControllers.getMyEnrolledCourse,
);

router.patch(
  '/update-enrolled-course-marks',
  auth('faculty', 'admin', 'superAdmin'),
  validateRequest(
    EnrolledCourseValidations.updateEnrolledCourseMarksValidationZodSchema,
  ),
  EnrolledCourseControllers.updateEnrolledCourseMarks,
);

export const EnrolledCourseRoutes = router;
