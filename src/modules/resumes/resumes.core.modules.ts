import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ECollectionName } from 'src/shared/type';
import { ResumeDocument } from './resume.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.RESUMES,
        schema: ResumeDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.RESUMES,
        schema: ResumeDocument.schema,
      },
    ]),
  ],
})
export class ResumeCoreModule {}
