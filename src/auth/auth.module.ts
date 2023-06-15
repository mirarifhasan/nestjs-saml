import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SamlStrategy } from './strategies/saml.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'saml' }),
  ],
  controllers: [AuthController],
  providers: [SamlStrategy],
})
export class AuthModule {}
