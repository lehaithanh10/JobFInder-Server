import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { EmployeeInfoResponseDto } from "src/modules/employee/dto/employee-info.dto";

export class ApplicationResponseDto {
  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  jobPostId: string;

  @ApiProperty()
  resumeId: string;

  @ApiPropertyOptional()
  message?: string;
}

export class ResumeInApplicationResponseDto {
  @ApiProperty()
  link: string;

  @ApiProperty()
  title: string;
}

export class ApplicationWithFullInfoResponseDto {
  @ApiProperty()
  employeeId: string;

  @ApiProperty()
  jobPostId: string;

  @ApiProperty()
  resumeId: string;

  @ApiPropertyOptional()
  message?: string;

  @ApiProperty()
  resume: ResumeInApplicationResponseDto;

  @ApiProperty()
  employee: EmployeeInfoResponseDto;
}
