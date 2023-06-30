import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ECollectionName } from 'src/shared/type';
import { EmployerDocument } from './employer.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.EMPLOYERS,
        schema: EmployerDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.EMPLOYEES,
        schema: EmployerDocument.schema,
      },
    ]),
  ],
})
export class EmployerCoreModule {}
