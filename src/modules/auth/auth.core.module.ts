import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ECollectionName } from 'src/shared/type';
import { UserDocument } from '../user/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.USERS,
        schema: UserDocument.schema,
      },
    ]),
  ],
  exports: [
    MongooseModule.forFeature([
      {
        name: ECollectionName.USERS,
        schema: UserDocument.schema,
      },
    ]),
  ],
})
export class AuthCoreModule {}
