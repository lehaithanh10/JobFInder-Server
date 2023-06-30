import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ECollectionName } from 'src/shared/type';
import { JobPostDocument } from './job-post.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.JOB_POST,
        schema: JobPostDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.JOB_POST,
        schema: JobPostDocument.schema,
      },
    ]),
  ],
})
export class JobPostCoreModule {}
