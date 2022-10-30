import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { JWT_SECRET } from '../auth.service';

const AUTHORIZATION_HEADER_KEY = 'Authorization';
const BEARER_KEY = 'Bearer';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: JWT_SECRET,
    });
  }

  validate(req: Request, payload: any) {
    const refreshToken = req
      .get(AUTHORIZATION_HEADER_KEY)
      .replace(BEARER_KEY, '')
      .trim();
    return { ...payload, refreshToken };
  }
}
