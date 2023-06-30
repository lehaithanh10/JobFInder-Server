import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ECollectionName } from "../../shared/type";
import { IUserDataSignWithJWT } from "../auth/auth.type";
import { UserLoginDto, UserRegisterDto } from "../auth/dto/auth.dto";
import { EmployeeDocument } from "../employee/employee.model";
import { EmployerDocument } from "../employer/employer.model";
import { UserDocument } from "../user/user.model";
const jwkToPem = require("jwk-to-pem");
const jwt = require("jsonwebtoken");

@Injectable()
export class AuthUserUtil {
  constructor(
    @InjectModel(ECollectionName.EMPLOYEES)
    private readonly employeeModel: Model<EmployeeDocument>,
    @InjectModel(ECollectionName.EMPLOYERS)
    private readonly employerModel: Model<EmployerDocument>,
    @InjectModel(ECollectionName.USERS)
    private readonly userModel: Model<UserDocument>
  ) {}

  async processForNewEmployer(
    userId: string,
    dataUser: UserLoginDto | UserRegisterDto
  ) {
    const employer = await this.employerModel.findOne({
      userId,
    });

    if (!employer) {
      await this.employerModel.create({
        userId,
        email: dataUser.email,
      });
    }
  }

  async processForNewEmployee(
    userId: string,
    dataUser: UserLoginDto | UserRegisterDto
  ) {
    const employee = await this.employeeModel.findOne({
      userId,
    });

    if (!employee) {
      await this.employeeModel.create({
        userId,
        email: dataUser.email,
      });
    }
  }

  async getUserInfoFromAccessToken(accessToken: string) {
    try {
      const data: IUserDataSignWithJWT = jwt.verify(
        accessToken,
        process.env.JWT_SECRET
      );

      return this.userModel.findOne({
        userId: data.userId,
        role: data.role,
      });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new UnauthorizedException(error);
      }
      // const data = await verifyToken(accessToken);
      // return this.userModel.findOne({ userId: data.uid });
    }
  }
}
