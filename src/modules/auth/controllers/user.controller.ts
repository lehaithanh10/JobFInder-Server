import { Controller, Get, HttpStatus } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from 'src/decorators/user.decorator';
import { UserResponseDto } from '../dto/auth.response.dto';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  @Get('user-info')
  @ApiOperation({
    operationId: 'getUserInfo',
    description: 'Operation to get user info',
    summary: 'Get user info',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserResponseDto,
  })
  getUserFromAccessToken(@User() user: UserResponseDto) {
    return user;
  }
}
