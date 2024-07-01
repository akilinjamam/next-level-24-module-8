import express, { NextFunction, Request, Response } from 'express';
import { userController } from './user.controller';

import validateRequest from '../../app/middleware/validateSchema';
import { createStudentZodSchema } from '../student/student.zodvalidation';
import { createAdminValidationSchema } from '../admin/admin.zodValidation';
import { createFacultyValidationSchema } from '../faculty/faculty.zodValidation';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from './user.constant';
import { userValidation } from './user.zodvalidation';
import { upload } from '../../app/utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createStudentZodSchema),
  userController.createStudent,
);

router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createFacultyValidationSchema),
  userController.createFaculty,
);

router.post(
  '/create-admin',
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validateRequest(createAdminValidationSchema),
  userController.createAdmin,
);
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.student, USER_ROLE.faculty),
  userController.getMe,
);

router.patch(
  '/change-status/:id',
  auth(USER_ROLE.admin),
  validateRequest(userValidation.userStatusChangeValidationSchema),
  userController.changeStatus,
);

export const userRouter = router;
