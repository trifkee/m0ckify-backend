import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/schemas/user.schema';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async validateUser({ username, password }: AuthPayloadDto) {
    try {
      const findUser = await this.userModel.findOne({ username }).exec();

      if (!findUser) return null;

      const matchPass = await bcrypt.compare(password, findUser.password);

      if (matchPass) {
        const { password, ...user } = findUser;
        return this.jwtService.sign(user);
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
