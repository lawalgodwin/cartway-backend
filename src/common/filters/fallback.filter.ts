import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class FallbackExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const httpCtx = host.switchToHttp();
    // const resques = httpCtx.getRequest()
    const response = httpCtx.getResponse();

    return response.status(500).json({
      status: 500,
      errorMessage: exception.message
        ? exception.message
        : 'Unexpected Error occured',
      caugthBy: 'FallbackExceptionFilter',
    });
  }
}
