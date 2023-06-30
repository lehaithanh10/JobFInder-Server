import { ApiPropertyOptional } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

export class SearchJobPostDto {
  @ApiPropertyOptional()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @IsArray()
  @Transform(({ value }) => (Array.isArray(value) ? value : Array(value)))
  @IsOptional()
  locations?: string[];

  @ApiPropertyOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  salary?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  keyword?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  companyId?: string;
}
