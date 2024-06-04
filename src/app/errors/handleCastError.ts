import mongoose from 'mongoose';
import { TerrorSource, TgenericErrorResponse } from '../interface/error';

const handleCastError = (
  err: mongoose.Error.CastError,
): TgenericErrorResponse => {
  const errorSources: TerrorSource = [
    {
      path: err?.path,
      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'invalid id',
    errorSources,
  };
};

export default handleCastError;
