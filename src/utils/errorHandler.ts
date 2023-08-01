import { Request, Response, NextFunction } from 'express';

export class ErrorHandler {
  static handle(err: Error, req: Request, res: Response, next: NextFunction) {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    const message = err.message || 'Internal Server Error';

    res.status(statusCode).json({
      error: {
        message,
      },
    });
  }

  static async asyncHandler(fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) {
    try {
      // @ts-ignore
      await fn(req, res, next);
    } catch (error) {
      // @ts-ignore
      ErrorHandler.handle(error, req, res, next);
    }
  }
}