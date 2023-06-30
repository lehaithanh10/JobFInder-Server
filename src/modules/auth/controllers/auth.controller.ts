import { Controller, Post, Body, HttpStatus } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { EUserIdentifierType } from "src/modules/user/user.type";
import { UserLoginDto, UserRegisterDto } from "../dto/auth.dto";
import {
  AuthLoginResponseDto,
  AuthRegisterResponseDto,
} from "../dto/auth.response.dto";
import { AuthService } from "../services/auth.service";

@ApiTags("user.auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  @ApiOperation({
    operationId: "userLogin",
    description: "Operation for user to login",
    summary: "User login",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthLoginResponseDto,
  })
  login(@Body() userLoginDto: UserLoginDto) {
    if (userLoginDto.identifierType === EUserIdentifierType.CREDENTIAL) {
      return this.authService.loginWithEmailAndPassword(userLoginDto);
    } else {
      // return this.authService.loginWithGoogle(userLoginDto);
    }
  }

  @Post("register")
  @ApiOperation({
    operationId: "userRegister",
    description: "Operation for user to register with email password",
    summary: "User register with email and password",
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: AuthRegisterResponseDto,
  })
  registerWithEmailAndPassword(@Body() userRegisterDto: UserRegisterDto) {
    return this.authService.registerWithEmailAndPassword(userRegisterDto);
  }

  //   @Delete('logout')
  //   @ApiOperation({
  //     operationId: 'userLogout',
  //     description: 'Operation for user to logout',
  //     summary: 'User logout',
  //   })
  //   logout() {}
}
