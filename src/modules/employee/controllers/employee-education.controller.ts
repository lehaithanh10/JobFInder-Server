import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import {
  CreateEmployeeEducationRequestDto,
  DeleteEmployeeEducationQueryDto,
  EditEmployeeEducationDto,
  EditEmployeeEducationQueryDto,
  EmployeeEducationResponseDto,
} from "../dto/employee-education.dto";
import "../dto/employee-info.dto";
import { Roles } from "src/decorators/role.decorator";
import { ERoleName } from "src/shared/model/type";
import { RolesGuard } from "src/guards/role.guard";
import { User } from "src/decorators/user.decorator";
import { EmployeeEducationService } from "../services/employee-education.service";

@ApiTags("employee.education")
@Controller("employee-education")
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class EmployeeEducationController {
  constructor(
    private readonly employeeEducationService: EmployeeEducationService
  ) {}

  @Post()
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: "employeeCreateEducationInfo",
    description: "Operation for employee create education information",
    summary: "employee create education information",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: EmployeeEducationResponseDto,
  })
  createEmployeeEducation(
    @User("userId") userId: string,
    @Body()
    createEmployeeEducationRequestDto: CreateEmployeeEducationRequestDto
  ) {
    console.log(userId);
    return this.employeeEducationService.createEmployeeEducation(
      userId,
      createEmployeeEducationRequestDto
    );
  }

  @Put()
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: "employeeEditEducationInfo",
    description: "Operation for employee edit education information",
    summary: "employee edit education information",
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  editEmployeeEducation(
    @User("userId") userId: string,
    @Body() editEmployeeEducationDto: EditEmployeeEducationDto,
    @Query() editEmployeeEducationQuery: EditEmployeeEducationQueryDto
  ) {
    return this.employeeEducationService.editEmployeeEducation(
      editEmployeeEducationDto,
      userId,
      editEmployeeEducationQuery.educationId
    );
  }

  @Delete()
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: "employeeDeleteEducationInfo",
    description: "Operation for employee delete education information",
    summary: "employee delete education information",
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  deleteEmployeeEducation(
    @User("userId") userId: string,
    @Query() deleteEmployeeEducationQuery: DeleteEmployeeEducationQueryDto
  ) {
    return this.employeeEducationService.deleteEmployeeEducation(
      userId,
      deleteEmployeeEducationQuery.educationId
    );
  }
}
