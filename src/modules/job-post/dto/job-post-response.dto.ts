import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class JobKeyWordResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  score: string;
}

export class JobPostResponseDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  active: boolean;

  @ApiProperty()
  companyId: string;

  @ApiProperty()
  requirements: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  locations: string[];

  @ApiProperty({ type: [JobKeyWordResponseDto] })
  keywords: JobKeyWordResponseDto[];

  @ApiPropertyOptional()
  categoryIds?: string[];
}
