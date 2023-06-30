import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName, IPagination } from "src/shared/model/type";
import { EmployeeDocument } from "../../employee/employee.model";

@Injectable()
export class UserEmployerService {
  constructor(
    @InjectModel(ECollectionName.EMPLOYERS)
    private readonly employerModel: Model<EmployeeDocument>
  ) {}

  async getListEmployer(pagination: IPagination) {
    const data = await this.employerModel.find(
      {},
      {},
      {
        skip: pagination.offset,
        limit: pagination.pageSize,
        sort: { createdAt: -1 },
      }
    );

    const total = await this.employerModel.count({});

    return {
      data,
      pagination: {
        ...pagination,
        total,
      },
    };
  }

  async getEmployer(employerId: string) {
    const employer = await this.employerModel.findById(employerId);

    if (!employer) {
      throw new NotFoundException("Employer not found");
    }

    return employer;
  }
}
