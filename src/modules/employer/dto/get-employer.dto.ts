import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class GetEmployerQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employerId: string;
}
