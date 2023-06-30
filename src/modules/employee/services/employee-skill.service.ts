import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  CreateEmployeeSkillRequestDto,
  EditEmployeeSkillDto,
} from "../dto/employee-skill.dto";
import { ECollectionName } from "src/shared/type";
import { EmployeeDocument } from "../employee.model";

@Injectable()
export class EmployeeSkillService {
  constructor(
    @InjectModel(ECollectionName.EMPLOYEES)
    private readonly employeeModel: Model<EmployeeDocument>
  ) {}

  async createEmployeeSkill(
    userId: string,
    data: CreateEmployeeSkillRequestDto
  ) {
    const employee = await this.employeeModel.findOne({ userId });

    if (!employee) {
      throw new NotFoundException({
        message: "Employee not found",
      });
    }

    const newEmployee = await this.employeeModel.findByIdAndUpdate(
      employee.id,
      { skill: [...employee.skill, ...data.skills] },
      { new: true }
    );

    return newEmployee.skill.find(
      (skillUpdated) =>
        !employee.skill.map((skill) => skill.id).includes(skillUpdated.id)
    );
  }

  async editEmployeeSkill(
    data: EditEmployeeSkillDto,
    userId: string,
    skillId: string
  ) {
    const employee = await this.employeeModel.findOne({ userId });

    if (!employee) {
      throw new NotFoundException({
        message: "Employee not found",
      });
    }

    const updatedSkill = employee.skill.map((skill) => {
      return skill.id === skillId
        ? {
            _id: skill._id,
            ...skill.toJSON(),
            ...data,
          }
        : skill;
    });

    await this.employeeModel.findByIdAndUpdate(employee.id, {
      skill: updatedSkill,
    });
  }

  async deleteEmployeeSkill(userId: string, skillId: string) {
    const employee = await this.employeeModel.findOne({ userId });

    if (!employee) {
      throw new NotFoundException({
        message: "Employee not found",
      });
    }

    const updatedSkill = employee.skill.filter((skill) => skill.id !== skillId);

    await this.employeeModel.findByIdAndUpdate(employee.id, {
      skill: updatedSkill,
    });
  }
}
