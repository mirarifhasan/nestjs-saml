import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [IndexModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
