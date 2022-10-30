import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './dto/jwt.strategy';
import { AuthGuardProvider } from './guards/jwt-auth.guard';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    AuthGuardProvider,
    JwtRefreshStrategy,
  ],
})
export class AuthModule {}
