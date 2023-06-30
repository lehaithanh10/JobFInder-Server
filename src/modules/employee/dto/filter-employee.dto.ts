import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class FilterEmployeeDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  userId: string;
}
