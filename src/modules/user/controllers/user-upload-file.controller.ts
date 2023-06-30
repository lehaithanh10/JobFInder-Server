import {
  Controller,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";

import {
  UploadFileDto,
  UserUploadFileResponseDto,
} from "../dto/user-upload-file.dto";
import { UserUploadFileService } from "../services/user-file-handler.service";

@Controller("file")
@ApiTags("user.file")
@ApiBearerAuth()
export class UserUploadFileController {
  constructor(private readonly userUploadFileService: UserUploadFileService) {}

  @Post("upload")
  @ApiBody({ type: UploadFileDto })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  @ApiOperation({
    operationId: "userUploadFile",
    description: "Operation for user upload file",
    summary: "user upload file",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserUploadFileResponseDto,
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const url = await this.userUploadFileService.uploadFile(file);
    console.log(url);
    return url;
  }
}
