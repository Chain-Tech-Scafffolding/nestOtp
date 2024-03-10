import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../user/dtos/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}
  async genHashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async matchPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  async generateToken(body: LoginDto) {
    return await this.jwtService.signAsync(body);
  }
}
