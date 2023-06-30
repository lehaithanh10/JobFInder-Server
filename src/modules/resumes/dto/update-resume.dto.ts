import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateResumeDto } from './create-resume.dto';

export class UpdateResumeDto extends PartialType(
  OmitType(CreateResumeDto, ['employeeId']),
) {}
