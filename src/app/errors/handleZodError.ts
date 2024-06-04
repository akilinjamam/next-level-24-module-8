import { ZodError, ZodIssue } from 'zod';
import { TerrorSource, TgenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TgenericErrorResponse => {
  const errorSources: TerrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: 'Zod Validation Erorr',
    errorSources,
  };
};

export default handleZodError;
