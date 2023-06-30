import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateEmployeeSkillDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  certificateLink?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  score?: string;
}

export class CreateEmployeeSkillRequestDto {
  @ApiProperty({ type: [CreateEmployeeSkillDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateEmployeeSkillDto)
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  skills: CreateEmployeeSkillDto[];
}

export class DeleteEmployeeSkillQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  skillId: string;
}

export class EditEmployeeSkillDto extends PartialType(CreateEmployeeSkillDto) {}

export class EditEmployeeSkillQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  skillId: string;
}

export class EmployeeSkillResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  certificateLink: string;

  @ApiProperty()
  score: string;

  @ApiProperty()
  id: string;
}
