import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthService } from '../auth/auth.service';

@Controller()
export class UserController {
  constructor(private authService: AuthService) {}

  @Post('/reg')
  async register(@Body() body: RegisterUserDto) {
    const hash_pass = await this.authService.genHashPassword(body.password);
    return { ...body, hash_pass };
  }

  @Post('/login')
  login() {}
}
