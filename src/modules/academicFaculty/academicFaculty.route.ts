import express from 'express';
import { AcademicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.zodValidation';
import validateRequest from '../../app/middleware/validateSchema';
import auth from '../../app/middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAcademicFaculty);
router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);
router.patch(
  '/:id',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateSingleAcademicFaculty,
);

export const academicFacultyRouter = router;
