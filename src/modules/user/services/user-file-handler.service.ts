import { BadRequestException, Injectable } from "@nestjs/common";
import { uploadFileToFireBase } from "src/shared/firebase/firebase";

@Injectable()
export class UserUploadFileService {
  constructor() {}

  async uploadFile(file: Express.Multer.File) {
    try {
      return uploadFileToFireBase(file);
    } catch (err) {
      throw new BadRequestException("Invalid file type");
    }
  }
}
