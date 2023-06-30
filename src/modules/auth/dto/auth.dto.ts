import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  ValidateIf,
} from 'class-validator';
import { EUserIdentifierType } from 'src/modules/user/user.type';
import { ERoleName } from 'src/shared/type';

export class UserLoginDto {
  @ApiPropertyOptional()
  @ValidateIf((d: UserLoginDto) =>
    [EUserIdentifierType.CREDENTIAL, EUserIdentifierType.GOOGLE].includes(
      d.identifierType,
    ),
  )
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiPropertyOptional()
  @ValidateIf(
    (d: UserLoginDto) => d.identifierType === EUserIdentifierType.CREDENTIAL,
  )
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @ValidateIf(
    (d: UserLoginDto) => d.identifierType !== EUserIdentifierType.CREDENTIAL,
  )
  @IsNotEmpty()
  @IsString()
  accessToken: string;

  @ApiProperty({ enum: ERoleName })
  @IsNotEmpty()
  @IsEnum(ERoleName)
  role: ERoleName;

  @ApiProperty({ enum: EUserIdentifierType })
  @IsNotEmpty()
  @IsEnum(EUserIdentifierType)
  identifierType: EUserIdentifierType;
}

export class UserRegisterDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  passwordAgain: string;

  @ApiProperty({ enum: ERoleName })
  @IsNotEmpty()
  @IsEnum(ERoleName)
  role: ERoleName;

  @ApiProperty({ enum: EUserIdentifierType })
  @IsNotEmpty()
  @IsEnum(EUserIdentifierType)
  identifierType: EUserIdentifierType;
}

export class CreateNewUserDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  @IsString()
  email: string;

  @ApiProperty({ enum: ERoleName })
  @IsNotEmpty()
  @IsEnum(ERoleName)
  role: ERoleName;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
