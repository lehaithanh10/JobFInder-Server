import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateEmployeeEducationDto } from "src/modules/employee/dto/employee-education.dto";
import { CreateEmployeeSkillDto } from "src/modules/employee/dto/employee-skill.dto";
import { EResumeMethod } from "../resume.model";
import { WorkingExperienceDto } from "src/modules/employee/dto/employee-working-experience.dto";

export class ResumeResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  link: string;

  @ApiProperty({ enum: EResumeMethod })
  method: EResumeMethod;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  gender?: string;

  @ApiPropertyOptional()
  dateOfBirth?: Date;

  @ApiPropertyOptional()
  location?: string;

  @ApiPropertyOptional()
  mobilePhone?: string;

  @ApiPropertyOptional()
  linkedInLink?: string;

  @ApiPropertyOptional()
  gitHubLink?: string;

  @ApiProperty({ type: [WorkingExperienceDto], required: false })
  workingExperiences?: WorkingExperienceDto[];

  @ApiProperty({ type: [CreateEmployeeSkillDto], required: false })
  skills?: CreateEmployeeSkillDto[];

  @ApiProperty({ type: [CreateEmployeeEducationDto], required: false })
  educations?: CreateEmployeeEducationDto[];
}
