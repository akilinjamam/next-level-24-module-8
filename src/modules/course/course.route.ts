import express from 'express';
import { CourseController } from './course.controller';
import validateRequest from '../../app/middleware/validateSchema';
import { courseValidations } from './course.validation';

const router = express.Router();

router.post(
  '/create-course',
  validateRequest(courseValidations.createCourseValidationSchema),
  CourseController.createCourse,
);

router.get('/', CourseController.getAllCourse);
router.get('/:id', CourseController.getSingleCourse);
router.delete('/:id', CourseController.deleteCourse);
router.patch(
  '/:id',
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
  validateRequest(courseValidations.facultiesWithCourseValidationSchema),
  CourseController.removeFaculties,
);

export const CourseRouter = router;
