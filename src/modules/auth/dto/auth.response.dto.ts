import { ApiProperty, ApiPropertyOptional, OmitType } from '@nestjs/swagger';
import { EUserIdentifierType } from 'src/modules/user/user.type';
import { ERoleName } from 'src/shared/type';

export class AuthLoginResponseDto {
  @ApiProperty()
  userId: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  identifier: string;

  @ApiProperty()
  identifierType: EUserIdentifierType;

  @ApiProperty()
  role: ERoleName;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  id: string;
}

export class AuthRegisterResponseDto extends AuthLoginResponseDto {}

export class UserResponseDto extends OmitType(AuthLoginResponseDto, [
  'name',
  'accessToken',
]) {}
