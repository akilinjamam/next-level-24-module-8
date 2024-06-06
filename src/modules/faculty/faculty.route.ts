import express from 'express';
import { FacultyControllers } from './faculty.controller';
import validateRequest from '../../app/middleware/validateSchema';
import { updateFacultyValidationSchema } from './faculty.zodValidation';

const router = express.Router();

router.get('/:id', FacultyControllers.getSingleFaculty);

router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

router.delete('/:id', FacultyControllers.deleteFaculty);

router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;
