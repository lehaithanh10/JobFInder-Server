import { Controller, Get, HttpStatus, Query } from "@nestjs/common";
import { EmployeeInfoService } from "../services/employee.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { EmployeeInfoResponseDto } from "../dto/employee-info.dto";

@Controller("user/employee-information")
@ApiTags("user.employee-information")
export class UserEmployeeInformationController {
  constructor(private readonly employeeInfoService: EmployeeInfoService) {}

  @Get()
  @ApiOperation({
    operationId: "userGetEmployeeInformation",
    description: "Operation for user get employee's information",
    summary: "user get employee's information",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: EmployeeInfoResponseDto,
  })
  getEmployee(@Query("userId") userId: string) {
    return this.employeeInfoService.getEmployeeByUserId(userId);
  }
}
