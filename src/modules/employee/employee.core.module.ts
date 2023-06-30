import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ECollectionName } from 'src/shared/type';
import { EmployeeDocument } from './employee.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.EMPLOYEES,
        schema: EmployeeDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.EMPLOYEES,
        schema: EmployeeDocument.schema,
      },
    ]),
  ],
})
export class EmployeeCoreModule {}
