import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';

import * as bcrypt from 'bcrypt';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private usersModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return await this.usersModel.find().exec();
  }
  async findOne(username: string, password: string): Promise<User> {
    try {
      const user = await this.usersModel.findOne({ username }).exec();

      if (!user) {
        throw new Error(
          `Sorry! we don't have account with ${username} as username.`,
        );
      }

      if (await bcrypt.compare(password, user.password)) {
        return user;
      } else {
        throw new HttpException('Invalid Credentials!', HttpStatus.BAD_REQUEST);
      }
    } catch (error) {
      throw error;
    }
  }

  // Get User by ID, for any other activity
  async findOneById(id: string): Promise<User> {
    try {
      const user = await this.usersModel.findOne({ id }).exec();

      if (!user) {
        throw new NotFoundException(`User doesn't exists!`);
      }

      return user;
    } catch (error) {
      throw new Error('Something went wrong...');
    }
  }

  async create(user: User): Promise<User> {
    try {
      const hashedPassword = await bcrypt.hash(user.password, 10);

      const createdUser = new this.usersModel({
        ...user,
        password: hashedPassword,
      });

      return await createdUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException(
          `${Object.keys(error.keyValue)} already exists.`,
        );
      }

      throw new Error('Something went wrong!.');
    }
  }

  async delete(userId: string) {
    try {
      const user = await this.usersModel.deleteOne({ id: userId }).exec();

      if (user.deletedCount === 0) {
        throw new NotFoundException(`User doesn't exists!`);
      }
    } catch (error) {
      if (error.status === 404) {
        throw new NotFoundException(`User doesn't exists!`);
      }

      throw new Error('Something went wrong.');
    }
  }

  async update(id: string, payload: Partial<User>) {
    try {
      const user = await this.usersModel
        // @ts-ignore
        .findOneAndUpdate(id, payload, { new: true })
        .exec();

      if (!user) {
        throw new NotFoundException(`User doesn't exists!`);
      }

      return user;
    } catch (error) {
      throw new Error('Something went wrong!');
    }
  }
}
