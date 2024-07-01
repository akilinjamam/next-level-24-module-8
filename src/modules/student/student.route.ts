import express, { NextFunction, Request, Response } from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../app/middleware/validateSchema';
import { updateStudentZodSchema } from './student.zodvalidation';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get('/', studentControllers.getAllStudent);
router.get(
  '/:studentId',
  auth(USER_ROLE.admin, USER_ROLE.student),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  studentControllers.getSingleStudent,
);
router.delete('/:studentId', studentControllers.deletedStudent);
router.patch(
  '/:studentId',
  validateRequest(updateStudentZodSchema),
  studentControllers.updateStudent,
);
export const studentRouter = router;
