import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "../../../shared/type";
import { IUserData } from "../../user/user.type";
import { UpdateEmployeeDto } from "../dto/update-employee.dto";
import { EmployeeDocument } from "../employee.model";

@Injectable()
export class EmployeeInfoService {
  constructor(
    @InjectModel(ECollectionName.EMPLOYEES)
    private readonly employeeModel: Model<EmployeeDocument>
  ) {}

  async getEmployeeByUserId(userId: string) {
    const employee = await this.employeeModel.findOne({ userId });

    if (!employee) {
      throw new NotFoundException("Employee not found");
    }
    return employee;
  }

  updateEmployeeBasicInfo(
    userId: string,
    updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeeModel.findOneAndUpdate({ userId }, updateEmployeeDto, {
      new: true,
    });
  }
}
