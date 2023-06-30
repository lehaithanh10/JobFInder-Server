import { Prop, Schema } from "@nestjs/mongoose";
import { BaseDocument } from "src/shared/mongoose/base.document";
import { DefaultSchemaOptions } from "src/shared/mongoose/schema-options";
import { ERoleName } from "src/shared/model/type";
import { EUserIdentifierType } from "./user.type";

@Schema(DefaultSchemaOptions)
export class UserDocument extends BaseDocument {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  identifier: string;

  @Prop({ required: true, enum: EUserIdentifierType })
  identifierType: EUserIdentifierType;

  @Prop()
  password?: string;

  @Prop({ required: true, enum: ERoleName })
  role: ERoleName;

  @Prop()
  accessToken?: string;
}
