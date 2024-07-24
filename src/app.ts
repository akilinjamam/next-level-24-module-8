import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middleware/globalErrorHandler';
import notFoundRoute from './app/middleware/notFoundRoute';
import router from './app/routes';
import cookieParser from 'cookie-parser';
const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: ['http://localhost:5173'], credentials: true }));

// testing unhandle rejection
// const test = async (req: Request, res: Response) => {
//   Promise.reject();
// };

// app.get('/', test);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/api/v1', router);

// not found route

app.use(notFoundRoute);

// global error handler

app.use(globalErrorHandler);

export default app;
