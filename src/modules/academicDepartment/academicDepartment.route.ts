import express from 'express';
import validateRequest from '../../app/middleware/validateSchema';
import { AcademicDepartmentController } from './academicDepartment.controller';
import { academicDepartmentValidation } from './academicDepartment.zodValidation';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-department',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicDepartmentValidation.createAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.createAcademicDepartment,
);

router.get('/', AcademicDepartmentController.getAcademicDepartment);
router.get('/:id', AcademicDepartmentController.getSingleAcademicDepartment);
router.patch(
  '/:id',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentController.updateSingleAcademicDepartment,
);

export const academicDepartmentRouter = router;
