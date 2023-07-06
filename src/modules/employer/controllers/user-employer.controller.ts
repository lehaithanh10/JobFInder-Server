import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { IPagination } from "../../../shared/type";
import {
  Pagination,
  PaginationSwaggerQuery,
} from "src/decorators/pagination.decorator";
import { UserEmployerService } from "../services/user-employer.service";
import { PaginationInterceptor } from "src/interceptors/pagination/pagination.interceptor";
import { EmployerResponseDto } from "../dto/employer-response.dto";
import { GetEmployerQueryDto } from "../dto/get-employer.dto";

@Controller("user")
@ApiTags("user.employer")
export class EmployerController {
  constructor(private readonly userEmployerService: UserEmployerService) {}

  @Get("/list-employer-information")
  @PaginationSwaggerQuery()
  @UseInterceptors(PaginationInterceptor)
  @ApiResponse({
    status: HttpStatus.OK,
    type: [EmployerResponseDto],
  })
  @ApiOperation({
    operationId: "getListEmployer",
    description: "Operation to get list employer",
    summary: "Get list employer",
  })
  findListEmployer(@Pagination() pagination: IPagination) {
    return this.userEmployerService.getListEmployer(pagination);
  }

  @Get("/employer-information")
  @ApiOperation({
    operationId: "userGetEmployerInformation",
    description: "Operation for user get employer information",
    summary: "user get employer information",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: EmployerResponseDto,
  })
  findOne(@Query() getEmployerQueryDto: GetEmployerQueryDto) {
    return this.userEmployerService.getEmployer(getEmployerQueryDto);
  }
}
