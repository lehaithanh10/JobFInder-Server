import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  CreateWorkingExperienceRequestDto,
  EditWorkingExperienceRequestDto,
} from "../dto/employee-working-experience.dto";
import { EmployeeDocument } from "../employee.model";
import { ECollectionName } from "src/shared/model/type";

@Injectable()
export class EmployeeWorkingExperienceService {
  constructor(
    @InjectModel(ECollectionName.EMPLOYEES)
    private readonly employeeModel: Model<EmployeeDocument>
  ) {}

  async create(userId: string, data: CreateWorkingExperienceRequestDto) {
    const employee = await this.employeeModel.findOne({ userId });
    if (!employee) throw new NotFoundException("Employee not found");

    const newEmployee = await this.employeeModel.findByIdAndUpdate(
      employee.id,
      {
        workingExperience: [
          ...employee.workingExperience,
          ...data.workingExperiences,
        ],
      },
      { new: true }
    );

    return newEmployee.workingExperience.find(
      (workingExperienceUpdated) =>
        !employee.workingExperience
          .map((workingExperience) => workingExperience.id)
          .includes(workingExperienceUpdated.id)
    );
  }

  async edit(
    userId: string,
    workingExperienceId: string,
    data: EditWorkingExperienceRequestDto
  ) {
    const employee = await this.employeeModel.findOne({ userId });
    if (!employee) throw new NotFoundException("Employee not found");

    const updatedWorkingExperience = employee.workingExperience.map(
      (workingExperience) => {
        return workingExperience.id === workingExperienceId
          ? {
              _id: workingExperience._id,
              ...workingExperience.toJSON(),
              ...data,
            }
          : workingExperience;
      }
    );

    await this.employeeModel.findByIdAndUpdate(employee.id, {
      workingExperience: updatedWorkingExperience,
    });
  }

  async delete(userId: string, workingExperienceId: string) {
    const employee = await this.employeeModel.findOne({ userId });
    if (!employee) throw new NotFoundException("Employee not found");

    const updatedWorkingExperience = employee.workingExperience.filter(
      (workingExperience) => workingExperience.id !== workingExperienceId
    );

    await this.employeeModel.findByIdAndUpdate(employee.id, {
      workingExperience: updatedWorkingExperience,
    });
  }
}
