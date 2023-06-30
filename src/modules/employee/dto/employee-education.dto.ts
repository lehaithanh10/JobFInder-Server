import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

export class CreateEmployeeEducationDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  schoolName: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  studyField: string;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startingDate?: Date;

  @ApiPropertyOptional({ type: Date })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endingDate?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateEmployeeEducationRequestDto {
  @ApiProperty({ type: [CreateEmployeeEducationDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateEmployeeEducationDto)
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  educations: CreateEmployeeEducationDto[];
}

export class EditEmployeeEducationDto extends PartialType(
  CreateEmployeeEducationDto
) {}

export class EditEmployeeEducationQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  educationId: string;
}

export class DeleteEmployeeEducationQueryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  educationId: string;
}

export class EmployeeEducationResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  startingDate: Date;

  @ApiProperty()
  endingDate: Date;

  @ApiPropertyOptional()
  studyField?: string;

  @ApiProperty()
  schoolName: string;

  @ApiPropertyOptional()
  description?: string;
}
