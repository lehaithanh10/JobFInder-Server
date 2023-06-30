import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { UpdateApplicationDto } from "./update-application.dto";

export class ReplyApplicationDto extends UpdateApplicationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  applicationId: string;
}
