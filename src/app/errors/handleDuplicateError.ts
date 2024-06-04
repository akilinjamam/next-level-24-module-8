import { TerrorSource, TgenericErrorResponse } from '../interface/error';

const handleDuplicateError = (err: any): TgenericErrorResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorSources: TerrorSource = [
    {
      path: '',
      message: `${extractedMessage} is alreaduy exists`,
      // message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'duplicate key error',
    errorSources,
  };
};

export default handleDuplicateError;
