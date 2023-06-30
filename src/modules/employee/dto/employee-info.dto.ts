import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

import { CreateEmployeeEducationDto } from "./employee-education.dto";
import { CreateEmployeeSkillDto } from "./employee-skill.dto";
import { WorkingExperienceDto } from "./employee-working-experience.dto";

export class EditEmployeeBasicInfoDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  dateOfBirth?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  linkedInLink?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  gitHubLink?: string;
}

export class GetEmployeeInfoQuery {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userId: string;
}

export class EmployeeInfoResponseDto {
  @ApiPropertyOptional()
  id: string;

  @ApiPropertyOptional()
  email: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  avatar?: string;

  @ApiPropertyOptional()
  gender?: string;

  @ApiPropertyOptional()
  dateOfBirth?: string;

  @ApiPropertyOptional()
  location?: string;

  @ApiPropertyOptional()
  mobilePhone: string;

  @ApiPropertyOptional()
  linkedInLink?: string;

  @ApiPropertyOptional()
  gitHubLink?: string;

  @ApiPropertyOptional({ type: [CreateEmployeeEducationDto] })
  education?: CreateEmployeeEducationDto[];

  @ApiPropertyOptional({ type: [WorkingExperienceDto] })
  workingExperience?: WorkingExperienceDto[];

  @ApiPropertyOptional({ type: [CreateEmployeeSkillDto] })
  skill?: CreateEmployeeSkillDto[];
}
