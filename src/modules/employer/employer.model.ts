import { Prop, Schema } from "@nestjs/mongoose";
import { BaseDocument } from "src/shared/mongoose/base.document";
import { DefaultSchemaOptions } from "src/shared/mongoose/schema-options";
@Schema(DefaultSchemaOptions)
export class EmployerDocument extends BaseDocument {
  @Prop({ required: true, type: String, unique: true })
  email: string;

  @Prop()
  companyName?: string;

  @Prop()
  companyFullName?: string;

  @Prop({ type: [String] })
  companyImages?: string[];

  @Prop()
  description?: string;

  @Prop({ required: true, type: String })
  userId: string;

  @Prop()
  logo?: string;

  @Prop()
  location?: string;

  @Prop()
  detailAddress?: string;

  @Prop({ type: [String] })
  keywordTechnology?: string[];
}
