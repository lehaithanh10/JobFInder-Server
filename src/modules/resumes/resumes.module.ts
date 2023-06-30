import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ResumesService } from "./services/employee-resume.service";
import { EmployeeResumeController } from "./controllers/employee-resume.controller";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { UtilModule } from "../utils/util.module";
import { ResumeCoreModule } from "./resumes.core.modules";
import { EmployeeCoreModule } from "../employee/employee.core.module";

@Module({
  imports: [ResumeCoreModule, EmployeeCoreModule, UtilModule],
  controllers: [EmployeeResumeController],
  providers: [ResumesService],
})
export class ResumesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(EmployeeResumeController);
  }
}
