import {
  Controller,
  Get,
  Body,
  Query,
  UseGuards,
  Param,
  Put,
  HttpStatus,
} from "@nestjs/common";
import { EmployerInfoService } from "../services/employer-info.service";
import { UpdateEmployerDto } from "../dto/update-employer.dto";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { GetEmployerQueryDto } from "../dto/get-employer.dto";
import { User } from "src/decorators/user.decorator";
import { IUserData } from "../../user/user.type";
import { Roles } from "src/decorators/role.decorator";
import { ERoleName } from "src/shared/type";
import { RolesGuard } from "src/guards/role.guard";
import { EmployerResponseDto } from "../dto/employer-response.dto";

@Controller("employer-info")
@ApiTags("employer.info")
@ApiBearerAuth()
@UseGuards(RolesGuard)
export class EmployerInfoController {
  constructor(private readonly employerInfoService: EmployerInfoService) {}

  @Roles(ERoleName.EMPLOYERS)
  @Put()
  @ApiOperation({
    operationId: "employerUpdateInformation",
    description: "Operation for employer update information",
    summary: "employer update information",
  })
  update(
    @User("userId") userId: string,
    @Body() updateEmployerDto: UpdateEmployerDto
  ) {
    return this.employerInfoService.updateEmployerInfo(
      userId,
      updateEmployerDto
    );
  }

  @Roles(ERoleName.EMPLOYERS)
  @Get()
  @ApiOperation({
    operationId: "EmployerGetInformation",
    description: "Operation for employer get their information",
    summary: "employer get information",
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: EmployerResponseDto,
  })
  findOne(@User("userId") userId: string) {
    return this.employerInfoService.getEmployer(userId);
  }
}
