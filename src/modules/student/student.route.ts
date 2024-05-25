import express from 'express';
import { studentControllers } from './student.controller';

const router = express.Router();

router.get('/', studentControllers.getAllStudent);
router.get('/:studentId', studentControllers.getSingleStudent);
router.delete('/:studentId', studentControllers.deletedStudent);

export const studentRouter = router;
