import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwt: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'];
    if (!auth) return false;
    try {
      const token = auth.replace('Bearer ', '');
      const payload = this.jwt.verify(token, { secret: process.env.JWT_SECRET });
      req.user = payload;
      return true;
    } catch {
      return false;
    }
  }
}