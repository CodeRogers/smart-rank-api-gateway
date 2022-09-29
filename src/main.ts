import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as momentTimezone from 'moment-timezone';
import { Logger } from '@nestjs/common';
import 'dotenv/config';
import { LogginInterceptor } from './interceptors/logging-interceptor';
import { TimeoutInterceptor } from './interceptors/temout.interceptor';
import { AllExceptionsFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('NestApplication');
  const app = await NestFactory.create(AppModule);

  app.useGlobalInterceptors(new LogginInterceptor(), new TimeoutInterceptor());
  app.useGlobalFilters(new AllExceptionsFilter());

  Date.prototype.toJSON = function (): any {
    return momentTimezone(this)
      .tz('America/Fortaleza')
      .format('DD-MM-YYYY HH:mm:ss.SSS');
  };

  await app.listen(process.env.PORT || 3333).then(() => {
    logger.log(
      `App running on port ${process.env.PORT ? process.env.PORT : 3333}`,
    );
  });
}
bootstrap();
