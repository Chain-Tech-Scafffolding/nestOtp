import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  async genHashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async matchPassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}
