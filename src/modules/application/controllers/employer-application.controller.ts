import {
  Controller,
  Get,
  Query,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  Put,
  Body,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { Roles } from "src/decorators/role.decorator";
import { RolesGuard } from "src/guards/role.guard";
import { ERoleName, IPagination } from "src/shared/type";
import { EmployerFilterApplicationDto } from "../dto/application-filter.dto";
import { EmployerApplicationService } from "../services/employer-application.service";
import { InjectExtraInfoToApplicationInterceptor } from "src/interceptors/application/inject-resume-data-to-application.interceptor";
import { ApplicationWithFullInfoResponseDto } from "../dto/application-response.dto";
import { ReplyApplicationDto } from "../dto/reply-application.dto";
import { User } from "src/decorators/user.decorator";
import {
  Pagination,
  PaginationSwaggerQuery,
} from "src/decorators/pagination.decorator";
import { PaginationInterceptor } from "src/interceptors/pagination/pagination.interceptor";

@ApiTags("employer.application")
@Controller("/employer/application")
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class EmployerApplicationsController {
  constructor(
    private readonly employerApplicationService: EmployerApplicationService
  ) {}

  @Get()
  @PaginationSwaggerQuery()
  @ApiOperation({
    operationId: "employerFilterApplications",
    description: "Operation for employee to filter applications",
    summary: "employer filter applications",
  })
  @UseInterceptors(
    InjectExtraInfoToApplicationInterceptor,
    PaginationInterceptor
  )
  @ApiResponse({
    status: HttpStatus.OK,
    type: [ApplicationWithFullInfoResponseDto],
  })
  filterApplication(
    @Query() query: EmployerFilterApplicationDto,
    @Pagination() pagination: IPagination
  ) {
    return this.employerApplicationService.filterApplication(query, pagination);
  }

  @Put("reply")
  @Roles(ERoleName.EMPLOYERS)
  @ApiOperation({
    operationId: "employerReplyApplication",
    description: "Operation for employer reply application of employee",
    summary: "employer reply application",
  })
  replyApplication(
    @User("userId") userId: string,
    @Body() replyApplicationDto: ReplyApplicationDto
  ) {
    return this.employerApplicationService.replyApplication(
      replyApplicationDto,
      userId
    );
  }
}
