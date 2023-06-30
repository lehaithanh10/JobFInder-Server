import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class EmployerResponseDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiPropertyOptional()
  companyName?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiProperty()
  userId: string;

  @ApiPropertyOptional()
  logo?: string;

  @ApiPropertyOptional({ type: String })
  location?: string;
}
