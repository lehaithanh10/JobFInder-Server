import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "src/shared/type";
import { EmployeeDocument } from "../../employee/employee.model";
import { IUserData } from "../../user/user.type";
import { UpdateEmployerDto } from "../dto/update-employer.dto";

@Injectable()
export class EmployerInfoService {
  constructor(
    @InjectModel(ECollectionName.EMPLOYERS)
    private readonly employerModel: Model<EmployeeDocument>
  ) {}

  updateEmployerInfo(userId: string, updateEmployerDto: UpdateEmployerDto) {
    return this.employerModel.findOneAndUpdate({ userId }, updateEmployerDto, {
      new: true,
    });
  }

  async getEmployer(userId: string) {
    const employer = await this.employerModel.findOne({ userId });

    if (!employer) {
      throw new NotFoundException("Employer not found");
    }

    return employer;
  }

  remove(id: number) {
    return `This action removes a #${id} employer`;
  }
}
