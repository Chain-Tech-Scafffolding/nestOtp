import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.schema';
import { RegisterUserDto } from './dtos/register-user.dto';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async RegisterUser(body: RegisterUserDto) {
    const user = new this.userModel(body);
    return await user.save();
  }

  async FindUser(email: string) {
    return this.userModel.find({ email: email });
  }
}
