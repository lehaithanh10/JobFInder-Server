import { ApiProperty } from "@nestjs/swagger";
import { EApplicationStatus } from "../application.types";
import { IsEnum, IsNotEmpty } from "class-validator";

export class UpdateApplicationDto {
  @ApiProperty({ enum: EApplicationStatus })
  @IsNotEmpty()
  @IsEnum(EApplicationStatus)
  status: EApplicationStatus;
}
