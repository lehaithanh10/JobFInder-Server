import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { EmployerApplicationService } from "./services/employer-application.service";
import { EmployerApplicationsController } from "./controllers/employer-application.controller";
import { ApplicationsEmployeeController } from "./controllers/employee-application.controller";
import { EmployeeApplicationService } from "./services/employee-application.service";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { UtilModule } from "../utils/util.module";
import { ApplicationCoreModule } from "./application.core.module";
import { ResumeCoreModule } from "../resumes/resumes.core.modules";
import { EmployeeCoreModule } from "../employee/employee.core.module";
import { JobPostCoreModule } from "../job-post/job-post.core.module";

@Module({
  imports: [
    ApplicationCoreModule,
    UtilModule,
    ResumeCoreModule,
    EmployeeCoreModule,
    UtilModule,
    JobPostCoreModule,
  ],
  controllers: [EmployerApplicationsController, ApplicationsEmployeeController],
  providers: [EmployerApplicationService, EmployeeApplicationService],
})
export class ApplicationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        EmployerApplicationsController,
        ApplicationsEmployeeController
      );
  }
}
