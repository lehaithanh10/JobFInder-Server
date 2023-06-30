import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ECollectionName } from 'src/shared/type';
import { ApplicationsDocument } from './application.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.APPLICATIONS,
        schema: ApplicationsDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.APPLICATIONS,
        schema: ApplicationsDocument.schema,
      },
    ]),
  ],
})
export class ApplicationCoreModule {}
