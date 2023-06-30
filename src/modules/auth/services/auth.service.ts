import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  BadRequestException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "src/shared/type";
import { UserLoginDto, UserRegisterDto } from "../dto/auth.dto";
import { UserDocument } from "../../user/user.model";
import { EUserIdentifierType } from "src/modules/user/user.type";
import { v4 as uuidV4 } from "uuid";
import {
  checkIsEmployeeCredential,
  checkIsEmployerCredential,
} from "../auth.helper";
import { AuthCommonService } from "./auth.common.service";
import { AuthUserUtil } from "src/modules/utils/auth-user.utils";
import * as _ from "lodash";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ECollectionName.USERS)
    private readonly userModel: Model<UserDocument>,
    private readonly authUserUtil: AuthUserUtil,
    private readonly authCommonService: AuthCommonService
  ) {}

  async loginWithEmailAndPassword(data: UserLoginDto) {
    const user = await this.userModel.findOne({
      role: data.role,
      identifier: data.email,
      identifierType: EUserIdentifierType.CREDENTIAL,
    });

    if (user) {
      if (bcrypt.compareSync(data.password, user.password)) {
        return {
          ..._.omit(user.toJSON(), ["password"]),
          accessToken: this.authCommonService.getToken({
            userId: user.userId,
            role: user.role,
          }),
        };
      } else {
        throw new UnauthorizedException({
          message: "Password wrong",
        });
      }
    }

    throw new NotFoundException({
      message: "User was not existed in system",
    });
  }

  // async loginWithGoogle(data: UserLoginDto) {
  //   const dataFromFirebase = await verifyToken(data.accessToken);

  //   const user = await this.userModel.findOne({
  //     role: data.role,
  //     identifier: data.email,
  //     identifierType: data.identifierType,
  //   });

  //   if (user) {
  //     return this.userModel.findOneAndUpdate(
  //       { _id: user.id },
  //       {
  //         accessToken: user.accessToken,
  //       }
  //     );
  //   } else {
  //     const newUser = await this.userModel.create({
  //       accessToken: data.accessToken,
  //       identifier: data.email,
  //       role: data.role,
  //       identifierType: EUserIdentifierType.GOOGLE,
  //       userId: dataFromFirebase.uid,
  //     });

  //     await this.processAfterCreateAccount(newUser.userId, data);

  //     return newUser;
  //   }
  // }

  async registerWithEmailAndPassword(data: UserRegisterDto) {
    // check user existed
    const user = await this.userModel.findOne({
      role: data.role,
      identifier: data.email,
      identifierType: EUserIdentifierType.CREDENTIAL,
    });

    if (data.password !== data.passwordAgain) {
      throw new BadRequestException({
        message: "Password and confirm password not match",
      });
    }

    if (user) {
      throw new UnauthorizedException({
        message: "User is already in the system",
      });
    } else {
      const newUser = await this.userModel.create({
        ...user,
        identifier: data.email,
        role: data.role,
        identifierType: EUserIdentifierType.CREDENTIAL,
        password: bcrypt.hashSync(data.password, bcrypt.genSaltSync()),
        userId: uuidV4(),
      });

      await this.processAfterCreateAccount(newUser.userId, data);

      return _.omit(
        {
          ...newUser.toJSON(),
          accessToken: this.authCommonService.getToken({
            userId: newUser.userId,
            role: newUser.role,
          }),
        },
        ["password"]
      );
    }
  }

  private async processAfterCreateAccount(
    userId: string,
    data: UserLoginDto | UserRegisterDto
  ) {
    if (checkIsEmployerCredential(data)) {
      await this.authUserUtil.processForNewEmployer(userId, data);
    }
    if (checkIsEmployeeCredential(data)) {
      await this.authUserUtil.processForNewEmployee(userId, data);
    }
  }
}
