import { Module } from '@nestjs/common';
import { RmqController } from './rmq.controller';

@Module({
  imports: [],
  controllers: [RmqController],
  providers: [],
})
export class RmqModule {}
