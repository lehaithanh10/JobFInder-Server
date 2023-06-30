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
  CreateWorkingExperienceRequestDto,
  DeleteWorkingExperienceQueryDto,
  EditWorkingExperienceQueryDto,
  EditWorkingExperienceRequestDto,
  EmployeeWorkingExperienceResponseDto,
} from "../dto/employee-working-experience.dto";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorators/role.decorator";
import { ERoleName } from "src/shared/type";
import { User } from "src/decorators/user.decorator";
import { EmployeeWorkingExperienceService } from "../services/employee-working-experience.service";

@ApiTags("employee.working-experience")
@Controller("employee-working-experience")
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class EmployeeWorkingExperienceController {
  constructor(
    private readonly workingExperienceService: EmployeeWorkingExperienceService
  ) {}

  @Post()
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: "employeeCreateWorkingExperienceInfo",
    description: "Operation for employee create working experience information",
    summary: "employee create working experience information",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: EmployeeWorkingExperienceResponseDto,
  })
  createEmployeeWorkingExperience(
    @User("userId") userId: string,
    @Body() body: CreateWorkingExperienceRequestDto
  ) {
    return this.workingExperienceService.create(userId, body);
  }

  @Put()
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: "employeeEditWorkingExperienceInfo",
    description: "Operation for employee edit working experience information",
    summary: "employee edit working experience information",
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  editEmployeeWorkingExperience(
    @User("userId") userId: string,
    @Body() body: EditWorkingExperienceRequestDto,
    @Query() query: EditWorkingExperienceQueryDto
  ) {
    const workingExperienceId = query.workingExperienceId;
    return this.workingExperienceService.edit(
      userId,
      workingExperienceId,
      body
    );
  }

  @Delete()
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: "employeeDeleteWorkingExperienceInfo",
    description: "Operation for employee delete working experience information",
    summary: "employee delete working experience information",
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  deleteEmployeeWorkingExperience(
    @User("userId") userId: string,
    @Query() query: DeleteWorkingExperienceQueryDto
  ) {
    return this.workingExperienceService.delete(
      userId,
      query.workingExperienceId
    );
  }
}
