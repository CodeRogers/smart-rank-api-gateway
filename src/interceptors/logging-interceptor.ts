import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogginInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const logger = new Logger('');
    const now = Date.now();
    const method = context.getArgs()[0].method;

    return next
      .handle()
      .pipe(
        tap(() =>
          logger.log(`Method ${method} time spent ${Date.now() - now}ms`),
        ),
      );
  }
}
