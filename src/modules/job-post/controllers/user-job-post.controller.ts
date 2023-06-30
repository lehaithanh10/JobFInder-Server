import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { UserJobPostService } from "../services/user-job-post.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { SearchJobPostDto } from "../dto/job-post-filter.dto";
import { JobPostResponseDto } from "../dto/job-post-response.dto";
import {
  Pagination,
  PaginationSwaggerQuery,
} from "src/decorators/pagination.decorator";
import { PaginationInterceptor } from "src/interceptors/pagination/pagination.interceptor";
import { IPagination } from "../../../shared/type";

@ApiTags("user.job-post")
@Controller("user/job-post")
export class JobPostController {
  constructor(private readonly userJobPostService: UserJobPostService) {}

  @Get("/search")
  @PaginationSwaggerQuery()
  @UseInterceptors(PaginationInterceptor)
  @ApiOperation({
    operationId: "userSearchJobPost",
    description: "Operation for user search job post",
    summary: "user search job post",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: [JobPostResponseDto],
  })
  findOne(
    @Query() searchData: SearchJobPostDto,
    @Pagination() pagination: IPagination
  ) {
    return this.userJobPostService.searchPost(searchData, pagination);
  }

  @Get(":postId")
  @ApiResponse({
    status: HttpStatus.OK,
    type: JobPostResponseDto,
  })
  @ApiOperation({
    operationId: "userGetJobPostDetail",
    description: "Operation for user read job post detail",
    summary: "user read job post detail",
  })
  readPostDetail(@Param("postId") postId: string) {
    return this.userJobPostService.readPostDetail(postId);
  }
}
