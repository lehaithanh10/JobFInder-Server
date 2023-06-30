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
import { ApplicationResponseDto } from "src/modules/application/dto/application-response.dto";
import { EmployeeDocument } from "src/modules/employee/employee.model";
import { JobPostDocument } from "src/modules/job-post/job-post.model";
import { ResumeDocument } from "src/modules/resumes/resume.model";
import { ECollectionName } from "../../shared/type";

@Injectable()
export class InjectExtraInfoToApplicationInterceptor
  implements NestInterceptor
{
  constructor(
    @InjectModel(ECollectionName.RESUMES)
    private readonly resumeModel: Model<ResumeDocument>,
    @InjectModel(ECollectionName.JOB_POST)
    private readonly jobPostModel: Model<JobPostDocument>,
    @InjectModel(ECollectionName.EMPLOYEES)
    private readonly employeeModel: Model<EmployeeDocument>
  ) {}

  intercept(ctx: ExecutionContext, call$: CallHandler<any>) {
    return call$
      .handle()
      .pipe(
        mergeMap((data) =>
          from(
            this.injectData(
              Array.isArray(data)
                ? data.map((data) => data.toJSON())
                : data.toJSON()
            )
          )
        )
      );
  }

  async injectData(
    data: ApplicationResponseDto[] | ApplicationResponseDto | null
  ) {
    if (Array.isArray(data)) {
      return Promise.all(
        data.map(async (application) => {
          const jobPost = await this.jobPostModel.findById(
            application.jobPostId
          );

          const employee = await this.employeeModel.findById(
            application.employeeId
          );

          return {
            ...application,
            job: jobPost,
            employee,
          };
        })
      );
    } else {
      const jobPost = await this.jobPostModel.findById(data.jobPostId);
      const employee = await this.employeeModel.findById(data.employeeId);

      return {
        ...data,
        job: jobPost,
        employee,
      };
    }
  }
}
