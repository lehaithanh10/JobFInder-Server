import { Prop, Schema } from "@nestjs/mongoose";
import { BaseDocument } from "src/shared/mongoose/base.document";
import { DefaultSchemaOptions } from "src/shared/mongoose/schema-options";
import { EApplicationStatus } from "./application.types";
import { ResumeDocument } from "../resumes/resume.model";
@Schema(DefaultSchemaOptions)
export class ApplicationsDocument extends BaseDocument {
  @Prop({ required: true })
  employeeId: string;

  @Prop({ required: true })
  jobPostId: string;

  @Prop({ required: true })
  resumeId: string;

  @Prop()
  message?: string;

  @Prop({ enum: EApplicationStatus, required: true })
  status: EApplicationStatus;

  @Prop({ type: ResumeDocument.schema, required: true })
  resume: ResumeDocument;
}
