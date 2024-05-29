import express from 'express';
import validateRequest from '../../app/middleware/validateSchema';
import { academicSemesterValidations } from './academicSemester.zodValidation';
import { academicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(academicSemesterValidations.academicSemesterValidationSchema),
  academicSemesterController.createAcademicSemester,
);

router.get('/', academicSemesterController.getAcademicSemester);
router.get('/:id', academicSemesterController.getSingleAcademicSemester);
router.patch('/:id', academicSemesterController.updateSingleAcademicSemester);

export const academicSemesterRouter = router;
