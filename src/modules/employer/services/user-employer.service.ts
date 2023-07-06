import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName, IPagination } from "../../../shared/type";
import { EmployeeDocument } from "../../employee/employee.model";
import { GetEmployerQueryDto } from "../dto/get-employer.dto";

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

  async getEmployer(getEmployerQueryDto: GetEmployerQueryDto) {
    const employer = !!getEmployerQueryDto.companyId
      ? await this.employerModel.findById(getEmployerQueryDto.companyId)
      : await this.employerModel.findOne(getEmployerQueryDto);

    if (!employer) {
      throw new NotFoundException("Employer not found");
    }

    return employer;
  }
}
