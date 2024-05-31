import express from 'express';
import { studentControllers } from './student.controller';
import validateRequest from '../../app/middleware/validateSchema';
import { updateStudentZodSchema } from './student.zodvalidation';

const router = express.Router();

router.get('/', studentControllers.getAllStudent);
router.get('/:studentId', studentControllers.getSingleStudent);
router.delete('/:studentId', studentControllers.deletedStudent);
router.patch(
  '/:studentId',
  validateRequest(updateStudentZodSchema),
  studentControllers.updateStudent,
);

export const studentRouter = router;
