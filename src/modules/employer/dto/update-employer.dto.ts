import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateEmployerDto } from "./create-employer.dto";
import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateEmployerDto extends PartialType(CreateEmployerDto) {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  companyName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  logo?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  detailAddress?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  companyImages?: string[];
}
