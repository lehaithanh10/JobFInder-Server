import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateJobPostDto } from "./create-job-post.dto";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateJobPostDto extends PartialType(CreateJobPostDto) {}

export class UpdateJobPostQueryDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  jobPostId: string;
}
