import { config } from "dotenv";
config();
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { EmployeeModule } from "./modules/employee/employee.module";
import { EmployerModule } from "./modules/employer/employer.module";
import { JobPostModule } from "./modules/job-post/job-post.module";
import { ApplicationsModule } from "./modules/application/application.module";
import { MongooseModule } from "@nestjs/mongoose";
import { AuthModule } from "./modules/auth/auth.module";
import { UtilModule } from "./modules/utils/util.module";
import { ResumesModule } from "./modules/resumes/resumes.module";
import { UserModule } from "./modules/user/user.module";
import { LoggerModule } from "nestjs-pino";

@Module({
  imports: [
    EmployeeModule,
    EmployerModule,
    JobPostModule,
    ResumesModule,
    ApplicationsModule,
    AuthModule,
    UserModule,
    MongooseModule.forRoot(process.env.MONGODB_DATABASE_URL),
    LoggerModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
