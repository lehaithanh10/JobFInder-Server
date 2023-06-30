import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  CreateEmployeeEducationRequestDto,
  EditEmployeeEducationDto,
} from "../dto/employee-education.dto";
import { ECollectionName } from "src/shared/type";
import { EmployeeDocument } from "../employee.model";

@Injectable()
export class EmployeeEducationService {
  constructor(
    @InjectModel(ECollectionName.EMPLOYEES)
    private readonly employeeModel: Model<EmployeeDocument>
  ) {}

  async createEmployeeEducation(
    userId: string,
    data: CreateEmployeeEducationRequestDto
  ) {
    console.log(data);
    const employee = await this.employeeModel.findOne({ userId });

    if (!employee) {
      throw new NotFoundException({
        message: "Employee not found",
      });
    }

    const newEmployee = await this.employeeModel.findByIdAndUpdate(
      employee.id,
      { education: [...employee.education, ...data.educations] },
      { new: true }
    );

    return newEmployee.education.find(
      (educationUpdated) =>
        !employee.education
          .map((education) => education.id)
          .includes(educationUpdated.id)
    );
  }

  async editEmployeeEducation(
    data: EditEmployeeEducationDto,
    userId: string,
    educationId: string
  ) {
    const employee = await this.employeeModel.findOne({ userId });

    if (!employee) {
      throw new NotFoundException({
        message: "Employee not found",
      });
    }

    const updatedEducation = employee.education.map((education) => {
      if (education.id === educationId) {
        return {
          _id: education._id,
          ...education.toJSON(),
          ...data,
        };
      }

      return education;
    });

    await this.employeeModel.findByIdAndUpdate(employee.id, {
      education: updatedEducation,
    });
  }

  async deleteEmployeeEducation(userId: string, educationId: string) {
    const employee = await this.employeeModel.findOne({ userId });

    if (!employee) {
      throw new NotFoundException({
        message: "Employee not found",
      });
    }

    const updatedEducation = employee.education.filter(
      (education) => education.id !== educationId
    );

    await this.employeeModel.findByIdAndUpdate(employee.id, {
      education: updatedEducation,
    });
  }
}
