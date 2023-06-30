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
  CreateEmployeeSkillRequestDto,
  DeleteEmployeeSkillQueryDto,
  EditEmployeeSkillDto,
  EditEmployeeSkillQueryDto,
  EmployeeSkillResponseDto,
} from "../dto/employee-skill.dto";
import { Roles } from "src/decorators/role.decorator";
import { ERoleName } from "../../../shared/type";
import { RolesGuard } from "src/guards/role.guard";
import { User } from "src/decorators/user.decorator";
import { EmployeeSkillService } from "../services/employee-skill.service";

@ApiTags("employee.skill")
@Controller("employee-skill")
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class EmployeeSkillController {
  constructor(private readonly employeeSkillService: EmployeeSkillService) {}

  @Post()
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: "employeeCreateEducationInfo",
    description: "Operation for employee create education information",
    summary: "employee create education information",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: EmployeeSkillResponseDto,
  })
  createEmployeeSkill(
    @User("userId") userId: string,
    @Body() createEmployeeSkillDto: CreateEmployeeSkillRequestDto
  ) {
    return this.employeeSkillService.createEmployeeSkill(
      userId,
      createEmployeeSkillDto
    );
  }

  @Put()
  @ApiOperation({
    operationId: "employeeEditEducationInfo",
    description: "Operation for employee edit education information",
    summary: "employee edit education information",
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  editEmployeeSkill(
    @User("userId") userId: string,
    @Body() editEmployeeSkillDto: EditEmployeeSkillDto,
    @Query() editEmployeeSkillQuery: EditEmployeeSkillQueryDto
  ) {
    return this.employeeSkillService.editEmployeeSkill(
      editEmployeeSkillDto,
      userId,
      editEmployeeSkillQuery.skillId
    );
  }

  @Delete()
  @ApiOperation({
    operationId: "employeeDeleteEducationInfo",
    description: "Operation for employee delete education information",
    summary: "employee delete education information",
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  deleteEmployeeSkill(
    @User("userId") userId: string,
    @Query() deleteEmployeeSkillQuery: DeleteEmployeeSkillQueryDto
  ) {
    return this.employeeSkillService.deleteEmployeeSkill(
      userId,
      deleteEmployeeSkillQuery.skillId
    );
  }
}
