import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "src/shared/model/type";
import { ApplicationsDocument } from "../application.model";
import { CreateApplicationDto } from "../dto/create-application.dto";
import { EApplicationStatus } from "../application.types";
import { EmployeeDocument } from "src/modules/employee/employee.model";
import { JobPostDocument } from "src/modules/job-post/job-post.model";
import { ResumeDocument } from "src/modules/resumes/resume.model";

@Injectable()
export class EmployeeApplicationService {
  constructor(
    @InjectModel(ECollectionName.EMPLOYEES)
    private readonly employeeModel: Model<EmployeeDocument>,
    @InjectModel(ECollectionName.JOB_POST)
    private readonly jobPostModel: Model<JobPostDocument>,
    @InjectModel(ECollectionName.APPLICATIONS)
    private readonly applicationModel: Model<ApplicationsDocument>,
    @InjectModel(ECollectionName.RESUMES)
    private readonly resumeModel: Model<ResumeDocument>
  ) {}
  async createApplication(data: CreateApplicationDto) {
    const { resumeId, message, jobPostId, employeeId } = data;

    const employee = await this.employeeModel.findById(employeeId);
    if (!employee) {
      throw new NotFoundException("Employee not found");
    }

    const jobPost = await this.jobPostModel.findById(jobPostId);
    if (!jobPost) {
      throw new NotFoundException("Job post not found");
    }

    const resume = await this.resumeModel.findById(resumeId);
    if (!resume) {
      throw new NotFoundException("Resume not found");
    }

    if (resume.employeeId !== employee.id) {
      throw new BadRequestException(
        "Can not apply job with a resume not belonging to you"
      );
    }

    return this.applicationModel.create({
      resumeId,
      message,
      jobPostId,
      employeeId,
      status: EApplicationStatus.PENDING,
      resume,
    });
  }

  async getApplications(userId: string) {
    const employee = await this.employeeModel.findOne({ userId });
    if (!employee) {
      throw new NotFoundException("Employee not found");
    }

    return this.applicationModel.find({ employeeId: employee.id });
  }
}
