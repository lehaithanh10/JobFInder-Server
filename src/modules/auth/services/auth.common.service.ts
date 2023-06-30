import { Injectable } from "@nestjs/common";
import { ERoleName } from "src/shared/type";
const jwt = require("jsonwebtoken");

@Injectable()
export class AuthCommonService {
  getToken({ userId, role }: { role: ERoleName; userId: string }) {
    const token = jwt.sign({ userId, role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });

    return token;
  }
}
