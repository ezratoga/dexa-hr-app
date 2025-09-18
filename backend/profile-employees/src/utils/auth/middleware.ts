// src/auth/auth.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt'; // Assuming you're using @nestjs/jwt

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided or invalid token format.');
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = await this.jwtService.verifyAsync(token); // Verify the token
      req['user'] = decoded; // Attach the decoded payload (e.g., user info) to the request
      next(); // Proceed to the next middleware or route handler
    } catch (err) {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }
}