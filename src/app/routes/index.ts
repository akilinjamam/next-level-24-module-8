import express from 'express';
import { userRouter } from '../../modules/user/user.route';
import { studentRouter } from '../../modules/student/student.route';
import { academicSemesterRouter } from '../../modules/academicSemester/academicSemester.route';
import { academicFacultyRouter } from '../../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRouter } from '../../modules/academicDepartment/academicDepartment.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/students',
    route: studentRouter,
  },
  {
    path: '/academic-semesters',
    route: academicSemesterRouter,
  },
  {
    path: '/academic-faculties',
    route: academicFacultyRouter,
  },
  {
    path: '/academic-departments',
    route: academicDepartmentRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
