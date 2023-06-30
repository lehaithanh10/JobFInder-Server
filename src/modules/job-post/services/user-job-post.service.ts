import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName, IPagination } from "../../../shared/type";
import { SearchJobPostDto } from "../dto/job-post-filter.dto";
import { JobPostDocument } from "../job-post.model";

@Injectable()
export class UserJobPostService {
  constructor(
    @InjectModel(ECollectionName.JOB_POST)
    private readonly jobPostModel: Model<JobPostDocument>
  ) {}

  async readPostDetail(postId) {
    const post = await this.jobPostModel.findById(postId);

    if (!post) {
      throw new NotFoundException({ message: "Job is not found" });
    }

    return post;
  }

  async searchPost(searchData: SearchJobPostDto, pagination: IPagination) {
    const mongoDbQuery = {} as any;

    if (searchData.locations) {
      mongoDbQuery.locations = {
        $in: searchData.locations,
      };
    }

    if (searchData.salary) {
      mongoDbQuery.salary = {
        $gte: searchData.salary,
      };
    }

    if (searchData.keyword) {
      mongoDbQuery["$or"] = [
        {
          keywords: {
            $elemMatch: {
              title: {
                $regex: `.*${searchData.keyword}.*`,
                $options: "i",
              },
            },
          },
        },
        {
          title: {
            $regex: `.*${searchData.keyword}.*`,
            $options: "i",
          },
        },
      ];
    }

    if (searchData.companyId) {
      mongoDbQuery.companyId = searchData.companyId;
    }

    const data = await this.jobPostModel.find(
      mongoDbQuery,
      {},
      {
        skip: pagination.offset,
        limit: pagination.pageSize,
        sort: { createdAt: -1 },
      }
    );

    const total = await this.jobPostModel.count(mongoDbQuery);

    return {
      data,
      pagination: {
        ...pagination,
        total,
      },
    };
  }
}
