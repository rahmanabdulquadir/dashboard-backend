import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'your_secret_key', // Use ENV variable for security
    });
  }

  async validate(payload: { id: string; email: string }) {
    const user = await this.prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) throw new UnauthorizedException();

    return user;
  }
}
