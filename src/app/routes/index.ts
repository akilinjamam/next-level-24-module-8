import express from 'express';
import { userRouter } from '../../modules/user/user.route';
import { studentRouter } from '../../modules/student/student.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
