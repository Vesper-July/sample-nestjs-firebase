import { FirebaseService } from './firebase.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [FirebaseService],
  exports: [FirebaseService]
})
export class FirebaseModule {}
