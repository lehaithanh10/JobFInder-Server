import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { AuthUserUtil } from "src/modules/utils/auth-user.utils";
import * as _ from "lodash";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly authUserUtil: AuthUserUtil) {}
  async use(req: Request, res: Response, next: NextFunction) {
    let accessToken: string;
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const tokens = authHeader.split(" ");
      accessToken = tokens[0] === "Bearer" ? tokens[1] : undefined;
    }

    if (!accessToken) {
      throw new UnauthorizedException({
        message: "Invalid access token",
      });
    }

    const user = await this.authUserUtil.getUserInfoFromAccessToken(
      accessToken
    );

    req["user"] = _.omit({ ...user.toJSON() }, ["password"]);
    next();
  }
}
