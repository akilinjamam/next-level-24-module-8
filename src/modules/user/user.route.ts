import express from 'express';
import { userController } from './user.controller';

import validateRequest from '../../app/middleware/validateSchema';
import { createStudentZodSchema } from '../student/student.zodvalidation';
import { createAdminValidationSchema } from '../admin/admin.zodValidation';
import { createFacultyValidationSchema } from '../faculty/faculty.zodValidation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const userRouter = router;
