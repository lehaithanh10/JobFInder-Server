import { Prop, Schema } from "@nestjs/mongoose";
import {
  BaseDocument,
  EmbeddedDocument,
} from "src/shared/mongoose/base.document";
import {
  DefaultSchemaOptions,
  EmbeddedSchemaOptions,
} from "src/shared/mongoose/schema-options";

@Schema(EmbeddedSchemaOptions)
export class EducationDocument extends EmbeddedDocument {
  @Prop()
  startingDate?: string;

  @Prop()
  endingDate?: string;

  @Prop()
  degree?: string;

  @Prop()
  studyField?: string;

  @Prop()
  schoolName: string;

  @Prop()
  description?: string;
}

@Schema(EmbeddedSchemaOptions)
export class WorkingExperienceDocument extends EmbeddedDocument {
  @Prop()
  position?: string;

  @Prop()
  companyName?: string;

  @Prop()
  companyAddress?: string;

  @Prop()
  responsibility?: string;

  @Prop()
  startingDate?: string;

  @Prop()
  endingDate?: string;
}

@Schema(EmbeddedSchemaOptions)
export class SkillDocument extends EmbeddedDocument {
  @Prop({ type: String, required: true })
  title: string;

  @Prop()
  certificateLink?: string;

  @Prop()
  score?: string;
}

@Schema(DefaultSchemaOptions)
export class EmployeeDocument extends BaseDocument {
  @Prop({ require: true })
  userId: string;

  @Prop()
  email?: string;

  @Prop()
  name?: string;

  @Prop()
  avatar?: string;

  @Prop()
  gender?: string;

  @Prop()
  age?: number;

  @Prop()
  profession?: string;

  @Prop()
  dateOfBirth?: string;

  @Prop()
  location?: string;

  @Prop()
  mobilePhone?: string;

  @Prop()
  profileDescription?: string;

  @Prop()
  facebookLink?: string;

  @Prop()
  linkedInLink?: string;

  @Prop()
  gitHubLink?: string;

  @Prop({ default: [], type: [EducationDocument.schema] })
  education?: EducationDocument[];

  @Prop({ default: [], type: [WorkingExperienceDocument.schema] })
  workingExperience?: WorkingExperienceDocument[];

  @Prop({ default: [], type: [SkillDocument.schema] })
  skill?: SkillDocument[];
}
