import { Module } from "@nestjs/common";
import { AuthCoreModule } from "../auth/auth.core.module";
import { EmployeeCoreModule } from "../employee/employee.core.module";
import { EmployerCoreModule } from "../employer/employer.core.module";
import { AuthUserUtil } from "./auth-user.utils";
import { SendGridUtil } from "./sendGrid/send-grid.utils";

const providers = [AuthUserUtil, SendGridUtil];

@Module({
  imports: [AuthCoreModule, EmployeeCoreModule, EmployerCoreModule],
  providers,
  exports: providers, 
})
export class UtilModule {}
