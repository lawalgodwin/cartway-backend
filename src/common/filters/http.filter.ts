import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const httpCtx = host.switchToHttp();
    // const resques = httpCtx.getRequest()
    const response = httpCtx.getResponse();
    const statusCode = exception.getStatus();

    return response.status(statusCode).json({
      status: statusCode,
      errorMessage: exception.message,
      caugthBy: 'HttpExceptionFilter',
    });
  }
}
