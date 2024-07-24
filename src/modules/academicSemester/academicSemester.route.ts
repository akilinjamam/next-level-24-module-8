import express from 'express';
import validateRequest from '../../app/middleware/validateSchema';
import { academicSemesterValidations } from './academicSemester.zodValidation';
import { academicSemesterController } from './academicSemester.controller';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(academicSemesterValidations.academicSemesterValidationSchema),
  academicSemesterController.createAcademicSemester,
);

router.get(
  '/',
  auth(USER_ROLE.admin),
  academicSemesterController.getAcademicSemester,
);
router.get('/:id', academicSemesterController.getSingleAcademicSemester);
router.patch('/:id', academicSemesterController.updateSingleAcademicSemester);

export const academicSemesterRouter = router;
