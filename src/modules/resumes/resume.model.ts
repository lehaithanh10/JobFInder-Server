import { Prop, Schema } from "@nestjs/mongoose";
import { BaseDocument } from "src/shared/mongoose/base.document";
import { DefaultSchemaOptions } from "src/shared/mongoose/schema-options";
import {
  EducationDocument,
  SkillDocument,
  WorkingExperienceDocument,
} from "../employee/employee.model";

export enum EResumeMethod {
  CREATE = "create",
  UPLOAD = "upload",
}

@Schema(DefaultSchemaOptions)
export class ResumeDocument extends BaseDocument {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  link: string;

  @Prop({ required: true })
  method: EResumeMethod;

  @Prop()
  email?: string;

  @Prop()
  name?: string;

  @Prop()
  gender?: string;

  @Prop()
  dateOfBirth?: string;

  @Prop()
  location?: string;

  @Prop()
  profession?: string;

  @Prop()
  profileDescription?: string;

  @Prop()
  skillDescription?: string;

  @Prop()
  mobilePhone?: string;

  @Prop()
  linkedInLink?: string;

  @Prop()
  gitHubLink?: string;

  @Prop()
  facebookLink?: string;

  @Prop({ default: [], type: [EducationDocument.schema] })
  education?: EducationDocument[];

  @Prop({ default: [], type: [WorkingExperienceDocument.schema] })
  workingExperience?: WorkingExperienceDocument[];

  @Prop({ default: [], type: [SkillDocument.schema] })
  skill?: SkillDocument[];

  @Prop({ default: 0 })
  yearsOfWorkingExperience?: number;
}
