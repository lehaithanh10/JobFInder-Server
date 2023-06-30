import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { JobPostEmployerController } from "./controllers/employer-job-post.controller";
import { JobPostEmployerService } from "./services/job-post-employer.service";
import { UserJobPostService } from "./services/user-job-post.service";
import { UtilModule } from "../utils/util.module";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { JobPostCoreModule } from "./job-post.core.module";
import { JobPostController } from "./controllers/user-job-post.controller";
import { EmployerCoreModule } from "../employer/employer.core.module";

@Module({
  imports: [JobPostCoreModule, UtilModule, EmployerCoreModule],
  controllers: [JobPostController, JobPostEmployerController],
  providers: [JobPostEmployerService, UserJobPostService],
})
export class JobPostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(JobPostEmployerController, JobPostEmployerController);
  }
}
