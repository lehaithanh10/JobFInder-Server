import { Prop, Schema } from "@nestjs/mongoose";
import {
  BaseDocument,
  EmbeddedDocument,
} from "src/shared/mongoose/base.document";
import { DefaultSchemaOptions } from "src/shared/mongoose/schema-options";

@Schema()
export class JobKeyWord extends EmbeddedDocument {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ type: String })
  score: string;
}

@Schema(DefaultSchemaOptions)
export class JobPostDocument extends BaseDocument {
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: Number })
  salary: number;

  @Prop({ required: true, type: String })
  companyId: string;

  @Prop({ required: true, type: String })
  description: string;

  @Prop({ required: true, type: String })
  requirement: string;

  @Prop({ default: [], type: [JobKeyWord.schema] })
  keywords: JobKeyWord[];

  @Prop({ type: [String] })
  locations?: string[];

  @Prop({ required: true, type: Boolean })
  active: boolean;
}
