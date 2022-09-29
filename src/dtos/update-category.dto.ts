import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<Events>;
}

interface Events {
  name: string;
  operation: string;
  value: number;
}
