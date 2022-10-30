import {
  Controller,
  Post,
  Body,
  Get,
  HttpCode,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './public.decorator';
import { RefreshTokenGuard } from './guards/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @Public()
  @HttpCode(200)
  login(@Body() payload: LoginDto) {
    return this.authService.login(payload);
  }

  @Post('logout')
  @HttpCode(200)
  logout() {
    return this.authService.logout();
  }

  @Get('refresh')
  @UseGuards(RefreshTokenGuard)
  refresh(@Request() request) {
    const { refreshToken, sub: userId } = request;
    return this.authService.refresh(userId, refreshToken);
  }

  @Post('register')
  @Public()
  register(@Body() payload: RegisterDto) {
    return this.authService.register(payload);
  }

  @Get('user-info')
  getUserInfo() {
    return this.authService.getUserInfo();
  }
}
