import {
  Controller,
  Get,
  Body,
  Patch,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  Query,
} from "@nestjs/common";
import { EmployeeInfoService } from "../services/employee.service";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { RolesGuard } from "src/guards/role.guard";
import { Roles } from "src/decorators/role.decorator";
import { ERoleName } from "../../../shared/type";
import { User } from "src/decorators/user.decorator";
import { IUserData } from "../../user/user.type";
import { InjectResumesToEmployeeInterceptor } from "src/interceptors/employee/inject-resume-data-to-employee.interceptor";
import { EmployeeInfoResponseDto } from "../dto/employee-info.dto";

@Controller("employee-information")
@ApiTags("employee.information")
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class EmployeeInformationController {
  constructor(private readonly employeeInfoService: EmployeeInfoService) {}

  @Roles(ERoleName.EMPLOYEES)
  @Patch()
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiOperation({
    operationId: "employeeUpdateInformation",
    description: "Operation for employee update information",
    summary: "employee update information",
  })
  update(
    @User() user: IUserData,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeeInfoService.updateEmployeeBasicInfo(
      user.userId,
      updateEmployeeDto
    );
  }
}
