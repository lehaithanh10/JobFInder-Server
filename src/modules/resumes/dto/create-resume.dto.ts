import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsArray,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  ValidateNested,
} from "class-validator";
import { CreateEmployeeEducationDto } from "src/modules/employee/dto/employee-education.dto";
import { CreateEmployeeSkillDto } from "src/modules/employee/dto/employee-skill.dto";
import { EResumeMethod } from "../resume.model";
import { WorkingExperienceDto } from "src/modules/employee/dto/employee-working-experience.dto";

export class CreateResumeDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  employeeId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  link: string;

  @IsEnum(EResumeMethod)
  @IsNotEmpty()
  @ApiProperty({ enum: EResumeMethod })
  method: EResumeMethod;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  gender?: string;

  @ApiPropertyOptional()
  @IsDate()
  @Type(() => Date)
  @IsOptional()
  dateOfBirth?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  profession?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  profileDescription?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  skillDescription?: string;

  @ApiPropertyOptional()
  @IsPhoneNumber()
  @IsOptional()
  mobilePhone?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  linkedInLink?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  facebookLink?: string;

  @ApiPropertyOptional()
  @IsUrl()
  @IsOptional()
  gitHubLink?: string;

  @ApiProperty({ type: [WorkingExperienceDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => WorkingExperienceDto)
  @IsArray()
  @IsOptional()
  workingExperience?: WorkingExperienceDto[];

  @ApiProperty({ type: [CreateEmployeeSkillDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => CreateEmployeeSkillDto)
  @IsArray()
  @IsOptional()
  skill?: CreateEmployeeSkillDto[];

  @ApiProperty({ type: [CreateEmployeeEducationDto], required: false })
  @ValidateNested({ each: true })
  @Type(() => CreateEmployeeEducationDto)
  @IsArray()
  @IsOptional()
  education?: CreateEmployeeEducationDto[];
}
