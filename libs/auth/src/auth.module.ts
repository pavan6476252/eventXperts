import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt/jwt.strategy';
import { AuthService } from './auth.service';
import { RoleGuard } from './role/role.guard';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import configuration from './utils/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [JwtStrategy, AuthService, RoleGuard, JwtAuthGuard],
  exports: [AuthService, RoleGuard, JwtAuthGuard],
})
export class AuthModule {}
