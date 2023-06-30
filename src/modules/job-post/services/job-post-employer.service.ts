import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "src/shared/model/type";
import { CreateJobPostDto } from "../dto/create-job-post.dto";
import { UpdateJobPostDto } from "../dto/update-job-post.dto";
import { JobPostDocument } from "../job-post.model";
import { EmployerDocument } from "src/modules/employer/employer.model";

@Injectable()
export class JobPostEmployerService {
  constructor(
    @InjectModel(ECollectionName.JOB_POST)
    private readonly jobPostModel: Model<JobPostDocument>,
    @InjectModel(ECollectionName.EMPLOYERS)
    private readonly employerModel: Model<EmployerDocument>
  ) {}

  async createJobPost(createJobPostDto: CreateJobPostDto) {
    const employer = await this.employerModel.findById(
      createJobPostDto.companyId
    );
    if (!employer) {
      throw new NotFoundException("Company not found");
    }

    const jobPost = await new this.jobPostModel(createJobPostDto);

    return jobPost.save();
  }

  async updateJobPost(
    userId: string,
    jobPostId: string,
    updateJobPostDto: UpdateJobPostDto
  ) {
    const [employer, jobPost] = await Promise.all([
      this.employerModel.findOne({ userId }),
      this.jobPostModel.findById(jobPostId),
    ]);

    if (!employer) {
      throw new NotFoundException("Compant not found");
    }
    if (!jobPost) {
      throw new NotFoundException("Job post not found");
    }
    if (jobPost.companyId !== employer.id) {
      throw new UnauthorizedException(
        "You do not have permission to edit this job post"
      );
    }

    return this.jobPostModel.findOneAndUpdate(
      { _id: jobPostId },
      updateJobPostDto,
      { new: true }
    );
  }

  async deleteJobPost(userId: string, jobPostId: string) {
    const [employer, jobPost] = await Promise.all([
      this.employerModel.findOne({ userId }),
      this.jobPostModel.findById(jobPostId),
    ]);

    if (!employer) {
      throw new NotFoundException("Company not found");
    }
    if (!jobPost) {
      throw new NotFoundException("Job post not found");
    }
    if (jobPost.companyId !== employer.id) {
      throw new UnauthorizedException(
        "You do not have permission to edit this job post"
      );
    }

    return this.jobPostModel.findByIdAndDelete(jobPostId);
  }
}
