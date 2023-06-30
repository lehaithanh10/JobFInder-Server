import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  UseGuards,
  Query,
} from "@nestjs/common";
import { JobPostEmployerService } from "../services/job-post-employer.service";
import { CreateJobPostDto } from "../dto/create-job-post.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import {
  UpdateJobPostDto,
  UpdateJobPostQueryDto,
} from "../dto/update-job-post.dto";
import { JobPostResponseDto } from "../dto/job-post-response.dto";
import { ERoleName } from "src/shared/model/type";
import { Roles } from "src/decorators/role.decorator";
import { RolesGuard } from "src/guards/role.guard";
import { User } from "src/decorators/user.decorator";

@ApiTags("employer.job-post")
@Controller("employer/job-post")
@UseGuards(RolesGuard)
@Roles(ERoleName.EMPLOYERS)
@ApiBearerAuth()
export class JobPostEmployerController {
  constructor(
    private readonly jobPostEmployerService: JobPostEmployerService
  ) {}

  @Post()
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: JobPostResponseDto,
  })
  @ApiOperation({
    operationId: "employerCreateJobPost",
    description: "Operation for employer create job post",
    summary: "employer create job post",
  })
  createJobPost(@Body() createJobPostDto: CreateJobPostDto) {
    return this.jobPostEmployerService.createJobPost(createJobPostDto);
  }

  @Put()
  @ApiResponse({
    status: HttpStatus.OK,
    type: JobPostResponseDto,
  })
  @ApiOperation({
    operationId: "employerUpdateJobPost",
    description: "Operation for employer update job post",
    summary: "employer update job post",
  })
  updateJobPost(
    @User("userId") userId: string,
    @Query() query: UpdateJobPostQueryDto,
    @Body() updateJobPostDto: UpdateJobPostDto
  ) {
    return this.jobPostEmployerService.updateJobPost(
      userId,
      query.jobPostId,
      updateJobPostDto
    );
  }

  @Delete()
  @ApiOperation({
    operationId: "employerDeleteJobPost",
    description: "Operation for employer delete job post",
    summary: "employer delete job post",
  })
  deleteJobPost(
    @User("userId") userId: string,
    @Query() query: UpdateJobPostQueryDto
  ) {
    return this.jobPostEmployerService.deleteJobPost(userId, query.jobPostId);
  }
}
