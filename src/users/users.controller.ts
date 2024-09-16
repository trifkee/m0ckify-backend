import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';

import { v4 as uuidv4 } from 'uuid';
import { User } from 'src/schemas/user.schema';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  async createNewUser(
    @Body('username') username: string,
    @Body('firstName') firstName: string,
    @Body('lastName') lastName: string,
    @Body('password') password: string,
    @Body('email') email: string,
    @Body('role') role: string,
  ) {
    return this.usersService.create({
      id: uuidv4(),
      role,
      username,
      email,
      firstName,
      lastName,
      password,
      projects: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.delete(id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateData: Partial<User>) {
    return this.usersService.update(id, updateData);
  }

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }

  @Post('login')
  getSingleUser(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.usersService.findOne(username, password);
  }
}
