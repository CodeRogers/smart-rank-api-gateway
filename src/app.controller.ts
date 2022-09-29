import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
  UseFilters,
  Delete,
} from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { ExceptionsFilter } from './filters/rpc-exception.filter';

@Controller()
export class AppController {
  private logger = new Logger(AppController.name);

  private clientAdminBackend: ClientProxy;

  constructor() {
    this.clientAdminBackend = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RMQ],
        queue: process.env.QUEUE,
      },
    });
  }

  @Post('categories')
  @UseFilters(new ExceptionsFilter())
  @UsePipes(ValidationPipe)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.clientAdminBackend.emit('createCategory', createCategoryDto);
  }

  @Get('categories')
  @UseFilters(new ExceptionsFilter())
  findAllCategory(@Query('name') name: string): Observable<any> {
    return this.clientAdminBackend.send('findAllCategory', name ? name : '');
  }

  @Patch('categories/:_id')
  @UseFilters(new ExceptionsFilter())
  @HttpCode(HttpStatus.NO_CONTENT || 204)
  updateCategory(
    @Param('_id') _id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.clientAdminBackend.emit('updateCategory', {
      _id,
      updateCategoryDto,
    });
  }

  @Delete('categories/:name')
  @UseFilters(new ExceptionsFilter())
  @HttpCode(HttpStatus.NO_CONTENT || 204)
  deleteCategory(@Param('name') name: string) {
    return this.clientAdminBackend.emit('deleteCategory', name);
  }
}
