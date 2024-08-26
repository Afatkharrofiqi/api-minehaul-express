import { Response } from 'express';
import { ZodError } from 'zod';

import { AppConfig } from '../configs/AppConfig';

interface SuccessResponse {
  data: unknown;
  message: string;
}

interface ErrorResponse {
  type: string;
  details?: Record<string, unknown>;
  detail?: {
    message: string;
    stack?: string | string[];
  };
}

export class ResponseHandler {
  static success(
    res: Response,
    data: unknown = {},
    message: string = 'Request processed successfully',
    statusCode: number = 200
  ) {
    const response: SuccessResponse = {
      data,
      message,
    };
    return res.status(statusCode).json(response);
  }

  static error(
    res: Response,
    error: unknown,
    message: string = 'An error occurred',
    statusCode: number = 500
  ) {
    let errorResponse: ErrorResponse;

    if (error instanceof ZodError) {
      // Handle Zod validation errors
      const groupedErrors = error.errors.reduce(
        (acc: Record<string, string[]>, issue) => {
          const path = issue.path.join('.');
          if (!acc[path]) {
            acc[path] = [];
          }
          acc[path].push(issue.message);
          return acc;
        },
        {}
      );

      const validationDetails = Object.keys(groupedErrors).map((path) => ({
        field: path,
        messages: groupedErrors[path],
      }));

      errorResponse = {
        type: 'validation',
        details: { validationDetails },
      };
    } else if (error instanceof Error) {
      // Handle general application errors
      errorResponse = {
        type: 'error',
        detail: {
          message: error.message,
          stack:
            AppConfig.nodeEnv === 'development'
              ? error.stack?.split('\n')
              : undefined,
        },
      };
    } else {
      // Handle other types of errors if necessary
      errorResponse = {
        type: 'unknown',
        detail: { message: 'An unknown error occurred' },
      };
    }

    return res.status(statusCode).json({
      error: errorResponse,
      message,
    });
  }
}
