import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName, IPagination } from "src/shared/type";
import { ApplicationsDocument } from "../application.model";
import { EApplicationStatus } from "../application.types";
import { ObjectId } from "bson";
import { ReplyApplicationDto } from "../dto/reply-application.dto";
import {
  ENotificationType,
  getMessagePayload,
} from "src/modules/utils/sendGrid/getMessagePayload";
import * as moment from "moment";
import { SendGridUtil } from "src/modules/utils/sendGrid/send-grid.utils";
import { ResumeDocument } from "src/modules/resumes/resume.model";
import { EmployerFilterApplicationDto } from "../dto/application-filter.dto";
import * as _ from "lodash";

@Injectable()
export class EmployerApplicationService {
  constructor(
    @InjectModel(ECollectionName.RESUMES)
    private readonly resumeModel: Model<ResumeDocument>,

    @InjectModel(ECollectionName.APPLICATIONS)
    private readonly applicationModel: Model<ApplicationsDocument>,
    private readonly sendGridUtil: SendGridUtil
  ) {}

  async filterApplication(
    options: EmployerFilterApplicationDto,
    pagination: IPagination
  ) {
    let mongoDbQuery = {};

    if (_.isEmpty(options)) {
      throw new ForbiddenException("You can not access all application");
    }

    mongoDbQuery = {
      $and: [],
    } as any;

    if (options.jobPostId) {
      mongoDbQuery["$and"].push({ jobPostId: options.jobPostId });
    }

    if (options.yearsOfWorkingExperience) {
      mongoDbQuery["$and"].push({
        "resume.yearsOfWorkingExperience": {
          $gte: options.yearsOfWorkingExperience,
        },
      });
    }

    if (options.skillTitles) {
      const filteredSkillTitles = options.skillTitles.filter(
        (skillTitle) => !!skillTitle
      );
      if (!_.isEmpty(filteredSkillTitles)) {
        mongoDbQuery["$and"].push({
          $or: filteredSkillTitles.reduce((result, skillInput) => {
            if (skillInput) {
              result.push({
                "resume.skill": {
                  $elemMatch: {
                    title: {
                      $regex: `.*${skillInput}.*`,
                      $options: "i",
                    },
                  },
                },
              });
            }
            return result;
          }, []),
        });
      }
    }

    if (options.schoolNames) {
      const filteredSchoolNames = options.schoolNames.filter(
        (schoolName) => !!schoolName
      );
      if (!_.isEmpty(filteredSchoolNames)) {
        mongoDbQuery["$and"].push({
          $or: filteredSchoolNames.reduce((result, schoolNameInput) => {
            if (schoolNameInput) {
              result.push({
                "resume.education": {
                  $elemMatch: {
                    schoolName: {
                      $regex: `.*${schoolNameInput}.*`,
                      $options: "i",
                    },
                  },
                },
              });
            }
            return result;
          }, []),
        });
      }
    }

    const applications = await this.applicationModel.find(
      mongoDbQuery,
      {},
      {
        skip: pagination.offset,
        limit: pagination.pageSize,
        sort: { createdAt: -1 },
      }
    );

    const total = await this.applicationModel.count(mongoDbQuery);

    return {
      data: applications,
      pagination: { ...pagination, total },
    };
  }

  async replyApplication(data: ReplyApplicationDto, userId: string) {
    const application = await this.applicationModel.aggregate([
      { $match: { _id: new ObjectId(data.applicationId) } },
      { $addFields: { objectIdEmployeeId: { $toObjectId: "$employeeId" } } },
      { $addFields: { objectIdJobPostId: { $toObjectId: "$jobPostId" } } },
      {
        $lookup: {
          from: "employees",
          localField: "objectIdEmployeeId",
          foreignField: "_id",
          as: "employeeBelong",
        },
      },
      {
        $lookup: {
          from: "job-posts",
          localField: "objectIdJobPostId",
          foreignField: "_id",
          as: "jobPostBelong",
        },
      },
      {
        $set: {
          employee: {
            $arrayElemAt: ["$employeeBelong", 0],
          },
          job: {
            $arrayElemAt: ["$jobPostBelong", 0],
          },
        },
      },
      { $addFields: { objectIdCompanyId: { $toObjectId: "$job.companyId" } } },
      {
        $lookup: {
          from: "employers",
          localField: "objectIdCompanyId",
          foreignField: "_id",
          as: "companyBelong",
        },
      },
      {
        $set: {
          company: {
            $arrayElemAt: ["$companyBelong", 0],
          },
        },
      },
      {
        $unset: [
          "objectIdEmployeeId",
          "objectIdCompanyId",
          "objectIdJobPostId",
          "companyBelong",
          "jobPostBelong",
          "employeeBelong",
        ],
      },
    ]);

    if (application[0].company.userId !== userId) {
      throw new ForbiddenException(
        "You do not have permission to reply this application"
      );
    }

    const message = getMessagePayload({
      notificationType:
        data.status === EApplicationStatus.ACCEPTED
          ? ENotificationType.ACCEPT_JOB
          : ENotificationType.REJECT_JOB,
      payload: {
        toEmail: application[0].employee.email,
        companyName: application[0].company.companyName,
        jobName: application[0].job.title,
        employeeName: application[0].employee.name,
      },
    });

    await this.sendGridUtil.sendEmail(message);

    await this.applicationModel.findByIdAndUpdate(data.applicationId, data);
  }

  getApplicationForJob(jobPostId: string) {
    return this.applicationModel.find({ jobPostId });
  }
}
