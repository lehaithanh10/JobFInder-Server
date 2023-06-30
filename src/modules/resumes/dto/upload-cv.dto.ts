import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UploadCVDto {
  @ApiProperty({
    type: "string",
    format: "binary",
    name: "file",
  })
  file: any;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;
}
