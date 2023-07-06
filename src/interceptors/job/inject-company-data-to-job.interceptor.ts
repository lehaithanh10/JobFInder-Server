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
import { ECollectionName } from "../../shared/type";
import { EmployerDocument } from "src/modules/employer/employer.model";
import { JobPostResponseDto } from "src/modules/job-post/dto/job-post-response.dto";

@Injectable()
export class InjectCompanyToJobInterceptor implements NestInterceptor {
  constructor(
    @InjectModel(ECollectionName.EMPLOYERS)
    private readonly employerModel: Model<EmployerDocument>
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

  async injectData(data: JobPostResponseDto[] | JobPostResponseDto | null) {
    if (Array.isArray(data)) {
      return Promise.all(
        data.map(async (jobPost) => {
          const company = await this.employerModel.findById(jobPost.companyId);

          return {
            ...jobPost,
            company,
          };
        })
      );
    } else {
      const company = await this.employerModel.findById(data.companyId);

      return {
        ...data,
        company,
      };
    }
  }
}
