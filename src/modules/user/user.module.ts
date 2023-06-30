import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { UserUploadFileService } from "./services/user-file-handler.service";
import { UserUploadFileController } from "./controllers/user-upload-file.controller";
import { AuthMiddleware } from "src/middlewares/auth.middleware";
import { UtilModule } from "../utils/util.module";

@Module({
  controllers: [UserUploadFileController],
  providers: [UserUploadFileService],
  imports: [UtilModule],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(UserUploadFileController);
  }
}
