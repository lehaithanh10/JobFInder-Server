import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "src/shared/type";
import { CreateResumeDto } from "../dto/create-resume.dto";
import { UpdateResumeDto } from "../dto/update-resume.dto";
import { ResumeDocument } from "../resume.model";
import { EmployeeDocument } from "src/modules/employee/employee.model";
const moment = require("moment");

@Injectable()
export class ResumesService {
  constructor(
    @InjectModel(ECollectionName.RESUMES)
    private readonly resumeModel: Model<ResumeDocument>,
    @InjectModel(ECollectionName.EMPLOYEES)
    private readonly employeeModel: Model<EmployeeDocument>
  ) {}
  async createResume(data: CreateResumeDto) {
    if (data.workingExperience && data.workingExperience.length > 0) {
      const totalExperienceInYear = moment
        .duration(
          data.workingExperience.reduce(
            (total, { startingDate, endingDate }) => {
              return (
                total +
                (!!startingDate && !!endingDate
                  ? moment(endingDate).diff(moment(startingDate))
                  : 0)
              );
            },
            0
          )
        )
        .asYears();
      return this.resumeModel.create({
        ...data,
        yearsOfWorkingExperience: Math.round(totalExperienceInYear),
      });
    }
    return this.resumeModel.create(data);
  }

  updateEmployeeResume(resumeId: string, updateResumeDto: UpdateResumeDto) {
    return this.resumeModel.findOneAndUpdate(
      { _id: resumeId },
      updateResumeDto,
      { new: true }
    );
  }

  deleteResume(resumeId: string) {
    return this.resumeModel.deleteOne({ _id: resumeId });
  }

  async getResumeByEmployee(userId: string) {
    const employee = await this.employeeModel.findOne({ userId });

    if (!employee) {
      throw new NotFoundException({
        message: "Employee not found",
      });
    }

    return this.resumeModel.find({
      employeeId: employee.id,
    });
  }
}
