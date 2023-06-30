import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { from } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { EmployeeInfoResponseDto } from "src/modules/employee/dto/employee-info.dto";
import { ResumeDocument } from "src/modules/resumes/resume.model";
import { ECollectionName } from "src/shared/type";

@Injectable()
export class InjectResumesToEmployeeInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(ECollectionName.RESUMES)
    private readonly resumeModel: Model<ResumeDocument>
  ) {}

  intercept(ctx: ExecutionContext, call$: CallHandler<any>) {
    return call$
      .handle()
      .pipe(mergeMap((data) => from(this.injectData(data.toJSON()))));
  }

  async injectData(data: EmployeeInfoResponseDto | null) {
    const resumes = await this.resumeModel.find({ employeeId: data.id });

    return { ...data, resumes };
  }
}
