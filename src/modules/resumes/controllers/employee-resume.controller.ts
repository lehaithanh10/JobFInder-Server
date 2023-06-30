import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  Get,
} from "@nestjs/common";
import { ResumesService } from "../services/employee-resume.service";
import { CreateResumeDto } from "../dto/create-resume.dto";
import { UpdateResumeDto } from "../dto/update-resume.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { ERoleName } from "src/shared/type";
import { Roles } from "src/decorators/role.decorator";
import { RolesGuard } from "src/guards/role.guard";
import { UploadCVDto } from "../dto/upload-cv.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { User } from "src/decorators/user.decorator";
import { IUserData } from "src/modules/user/user.type";
import { ResumeResponseDto } from "../dto/resume-response.dto";

@Controller("resume")
@ApiTags("employee.resume")
@UseGuards(RolesGuard)
@ApiBearerAuth()
export class EmployeeResumeController {
  constructor(private readonly resumesService: ResumesService) {}

  @Post()
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: "employeeCreateResume",
    description: "Operation for employee create resume",
    summary: "employee create resume",
  })
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumesService.createResume(createResumeDto);
  }

  @Get()
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: "employeeGetResume",
    description: "Operation for employee get resume",
    summary: "employee get resume",
  })
  @ApiResponse({ status: HttpStatus.OK, type: ResumeResponseDto })
  getResumeByEmployeeId(@User("userId") userId: string) {
    return this.resumesService.getResumeByEmployee(userId);
  }

  @Patch(":resumeId")
  @Roles(ERoleName.EMPLOYEES)
  @ApiOperation({
    operationId: "employeeUpdateResume",
    description: "Operation for employee update resume",
    summary: "employee update resume",
  })
  @ApiResponse({ status: HttpStatus.CREATED })
  update(
    @Param("resumeId") resumeId: string,
    @Body() updateResumeDto: UpdateResumeDto
  ) {
    return this.resumesService.updateEmployeeResume(resumeId, updateResumeDto);
  }

  @Delete(":resumeId")
  @ApiOperation({
    operationId: "employeeDeleteResume",
    description: "Operation for employee delete resume",
    summary: "employee delete resume",
  })
  remove(@Param("resumeId") resumeId: string) {
    return this.resumesService.deleteResume(resumeId);
  }
}
