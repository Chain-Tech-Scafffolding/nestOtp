import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from './dtos/register-user.dto';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { EmailService } from '../email/email.service';
import { LoginDto } from './dtos/login.dto';
import { NotFoundError } from 'rxjs';

@Controller()
export class UserController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private emailService: EmailService,
  ) {}

  @Post('/reg')
  async register(@Body() body: RegisterUserDto) {
    const user = await this.userService.FindUser(body.email);
    if (user.length) {
      throw new UnauthorizedException('User already exists');
    }
    body.password = await this.authService.genHashPassword(body.password);
    const savedUser = await this.userService.RegisterUser(body);

    try {
      const emailSend = await this.emailService.sendMail(
        savedUser.email,
        savedUser.name,
      );
      return emailSend;
    } catch (error) {
      throw new HttpException('Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    const IsUserExist = await this.userService.FindUser(body.email);
    console.log(body);

    if (IsUserExist.length) {
      const IsCorrectPass = await this.authService.matchPassword(
        body.password,
        IsUserExist[0].password,
      );

      if (IsCorrectPass) {
        body.password = IsUserExist[0].password;
        return this.authService.generateToken(body);
      } else {
        throw new UnauthorizedException('Wrong Password');
      }
    } else {
      throw new NotFoundError('User Not found please check the email');
    }
  }
}
