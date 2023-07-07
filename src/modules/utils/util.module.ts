import { Module } from "@nestjs/common";
import { AuthCoreModule } from "../auth/auth.core.module";
import { EmployeeCoreModule } from "../employee/employee.core.module";
import { EmployerCoreModule } from "../employer/employer.core.module";
import { AuthUserUtil } from "./auth-user.utils";
import { SendGridUtil } from "./sendGrid/send-grid.utils";
import { CourierUtil } from "./courier/courier.utils";

const providers = [AuthUserUtil, SendGridUtil, CourierUtil];

@Module({
  imports: [AuthCoreModule, EmployeeCoreModule, EmployerCoreModule],
  providers,
  exports: providers, 
})
export class UtilModule {}
