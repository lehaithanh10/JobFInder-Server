import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { EmployeeInfoService } from "./services/employee.service";
import { EmployeeInformationController } from "./controllers/employee-info.controller";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { UtilModule } from "../utils/util.module";
import { EmployeeCoreModule } from "./employee.core.module";
import { ResumeCoreModule } from "../resumes/resumes.core.modules";
import { EmployeeEducationController } from "./controllers/employee-education.controller";
import { EmployeeSkillController } from "./controllers/employee-skill.controller";
import { EmployeeWorkingExperienceController } from "./controllers/employee-working-experience.controller";
import { EmployeeEducationService } from "./services/employee-education.service";
import { EmployeeSkillService } from "./services/employee-skill.service";
import { EmployeeWorkingExperienceService } from "./services/employee-working-experience.service";
import { UserEmployeeInformationController } from "./controllers/user-employee-info.controller";

@Module({
  imports: [EmployeeCoreModule, UtilModule, ResumeCoreModule],
  controllers: [
    EmployeeInformationController,
    EmployeeEducationController,
    EmployeeSkillController,
    EmployeeWorkingExperienceController,
    UserEmployeeInformationController,
  ],
  providers: [
    EmployeeInfoService,
    EmployeeEducationService,
    EmployeeSkillService,
    EmployeeWorkingExperienceService,
  ],
})
export class EmployeeModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        EmployeeInformationController,
        EmployeeEducationController,
        EmployeeSkillController,
        EmployeeWorkingExperienceController
      );
  }
}
