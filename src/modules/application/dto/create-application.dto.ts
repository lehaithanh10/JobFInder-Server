import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  employeeId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  jobPostId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  resumeId: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  message?: string;
}
