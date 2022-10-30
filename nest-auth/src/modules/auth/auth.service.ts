import { ForbiddenException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

export const JWT_SECRET = 'some_secret_key;';

@Injectable()
export class AuthService {
  user = {
    id: 1,
    name: 'John',
    email: 'text@example.com',
    refreshToken: '',
  };

  constructor(private jwt: JwtService) {}

  async login(payload: LoginDto) {
    const { accessToken, refreshToken } = await this.getTokens();
    return {
      accessToken,
      refreshToken,
      user: this.user,
    };
  }

  async getTokens() {
    const claims = {
      email: 'some-email@example.com',
      sub: 1,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwt.signAsync(claims, {
        secret: JWT_SECRET,
        expiresIn: '5s',
      }),
      this.jwt.signAsync(claims, {
        secret: JWT_SECRET,
        expiresIn: '1m',
      }),
    ]);

    this.user.refreshToken = refreshToken;
    return { accessToken, refreshToken };
  }

  register(payload: RegisterDto) {
    return 'This action adds a new auth';
  }

  logout() {
    return {};
  }

  async refresh(userId: number, refreshToken: string) {
    // if (userId !== this.user.id) {
    //   throw new ForbiddenException('Invalid token');
    // }
    return await this.getTokens();
  }

  getUserInfo() {
    return {
      id: 1,
      name: 'John',
      email: 'text@example.com',
    };
  }
}
