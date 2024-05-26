import express from 'express';
import { userController } from './user.controller';

import validateRequest from '../../app/middleware/validateSchema';
import { createStudentZodSchema } from '../student/student.zodvalidation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentZodSchema),
  userController.createStudent,
);

export const userRouter = router;
