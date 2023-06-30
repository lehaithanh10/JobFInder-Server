import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class EmployerFilterApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobPostId: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  skillTitles?: string[];

  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  @IsOptional()
  yearsOfWorkingExperience?: number;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  schoolNames?: string[];
}
