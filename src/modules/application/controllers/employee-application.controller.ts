import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiTags } from "@nestjs/swagger";
import { EmployeeApplicationService } from "../services/employee-application.service";
import { CreateApplicationDto } from "../dto/create-application.dto";
import { Roles } from "src/decorators/role.decorator";
import { ERoleName } from "../../../shared/type";
import { RolesGuard } from "src/guards/role.guard";
import { InjectExtraInfoToApplicationInterceptor } from "src/interceptors/application/inject-resume-data-to-application.interceptor";
import { User } from "src/decorators/user.decorator";

@ApiTags("employee.application")
@Controller("/employee/application")
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class ApplicationsEmployeeController {
  constructor(
    private readonly employeeApplicationService: EmployeeApplicationService
  ) {}

  @Post()
  @Roles(ERoleName.EMPLOYEES)
  @UseInterceptors(InjectExtraInfoToApplicationInterceptor)
  @ApiOperation({
    operationId: "employeeCreateApplication",
    description: "Operation for employee create application",
    summary: "employee create application",
  })
  createApplication(@Body() createApplicationDto: CreateApplicationDto) {
    return this.employeeApplicationService.createApplication(
      createApplicationDto
    );
  }

  @Get()
  @Roles(ERoleName.EMPLOYEES)
  @UseInterceptors(InjectExtraInfoToApplicationInterceptor)
  @ApiOperation({
    operationId: "employeeGetApplications",
    description: "Operation for employee to get applications",
    summary: "employee get applications",
  })
  getApplication(@User("userId") userId: string) {
    return this.employeeApplicationService.getApplications(userId);
  }
}
