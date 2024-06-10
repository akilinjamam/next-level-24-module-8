import express from 'express';
import { userController } from './user.controller';

import validateRequest from '../../app/middleware/validateSchema';
import { createStudentZodSchema } from '../student/student.zodvalidation';
import { createAdminValidationSchema } from '../admin/admin.zodValidation';
import { createFacultyValidationSchema } from '../faculty/faculty.zodValidation';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  validateRequest(createStudentZodSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
);

export const userRouter = router;
