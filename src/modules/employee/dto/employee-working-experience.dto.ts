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

export class WorkingExperienceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  companyName: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  companyAddress?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  responsibility?: string;

  @ApiProperty({ required: false, type: Date })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  startingDate?: Date;

  @ApiProperty({ required: false, type: Date })
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  endingDate?: Date;
}

export class CreateWorkingExperienceRequestDto {
  @ApiProperty({ type: [WorkingExperienceDto] })
  @ValidateNested({ each: true })
  @Type(() => WorkingExperienceDto)
  @ArrayMinSize(1)
  @IsArray()
  @IsNotEmpty()
  workingExperiences: WorkingExperienceDto[];
}

export class EditWorkingExperienceRequestDto extends PartialType(
  WorkingExperienceDto
) {}

export class EditWorkingExperienceQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  workingExperienceId: string;
}

export class DeleteWorkingExperienceQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  workingExperienceId: string;
}

export class EmployeeWorkingExperienceResponseDto {
  @ApiProperty()
  position: string;

  @ApiProperty()
  companyName: string;

  @ApiPropertyOptional()
  companyAddress?: string;

  @ApiPropertyOptional()
  responsibility?: string;

  @ApiPropertyOptional()
  startingDate?: Date;

  @ApiPropertyOptional()
  endingDate?: Date;
}
