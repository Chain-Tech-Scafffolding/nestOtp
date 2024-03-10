import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { ProducerService } from 'src/queue/producer.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>, private producerService: ProducerService,) { }

  async create(CreateUserDto: CreateUserDto) {
    const existingUser = await this.userModel.findOne({ email: CreateUserDto.email });
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists');
    }
    const hashPassword = await bcrypt.hash(CreateUserDto.password, 10);
    const newUser = new this.userModel({ ...CreateUserDto, password: hashPassword });

    const user = await newUser.save();
    const emailData = {
      email: user.email,
      subject: 'Welcome to Our Community',
      html: `<p>Hello ${user.name},</p>
      <p>Welcome to our community! Your account is now active.</p>
      <p>Enjoy your time with us!</p>`,
    };
    await this.producerService.addToEmailQueue(emailData);
    console.log(user)
    return user
  }
  
}
