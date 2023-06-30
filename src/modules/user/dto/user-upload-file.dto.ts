import { ApiProperty } from "@nestjs/swagger";

export class UserUploadFileResponseDto {
  @ApiProperty()
  url: string;
}

export class UploadFileDto {
  @ApiProperty({
    type: "string",
    format: "binary",
    name: "file",
  })
  file: any;
}
