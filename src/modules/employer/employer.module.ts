import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { EmployerInfoService } from "./services/employer-info.service";
import { EmployerInfoController } from "./controllers/employer-info.controller";
import { EmployerCoreModule } from "./employer.core.module";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { UtilModule } from "../utils/util.module";
import { EmployerController } from "./controllers/user-employer.controller";
import { UserEmployerService } from "./services/user-employer.service";

@Module({
  imports: [EmployerCoreModule, UtilModule],
  controllers: [EmployerInfoController, EmployerController],
  providers: [EmployerInfoService, UserEmployerService],
})
export class EmployerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(EmployerInfoController);
  }
}
