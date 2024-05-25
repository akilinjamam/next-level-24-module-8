import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { studentRouter } from './modules/student/student.route';
import { userRouter } from './modules/user/user.route';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundRoute from './app/middleware/notFoundRoute';
import router from './app/routes';
const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/v1', router);

// not found route

app.use(notFoundRoute);

// global error handler

app.use(globalErrorHandler);

export default app;
