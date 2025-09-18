import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { UserService } from './users.service';
import { Users } from './users.entity';
import { CreateUserDto } from './dto/register.dto';
import { LoginUserDTO } from './dto/login.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserAdminDto } from './dto/update-user-admin-dto';

@Controller('users/v1')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async registerUser(@Body() createUserDTO: CreateUserDto): Promise<any> {
    return await this.userService.registerUser(createUserDTO);
  }

  @Post('login')
  async loginUser(@Body() loginUser: LoginUserDTO): Promise<any> {
    return await this.userService.loginUser(loginUser);
  }

  @Post('login-admin')
  async loginUserAdmin(@Body() loginUser: LoginUserDTO): Promise<any> {
    return await this.userService.loginUserAdmin(loginUser);
  }

  @Put('update-user')
  async updateUser(@Body() updateUser: UpdateUserDto, @Req() req: any): Promise<any> {
    const { user } = req;
    return await this.userService.updateUser(updateUser, user);
  }

  @Put('update-user/:id')
  async updateUserAdmin(@Body() updateUser: UpdateUserAdminDto, @Param(':id') id): Promise<any> {
    return await this.userService.updateUser(updateUser, id);
  }

  @Get('all-users')
  async getAllUsers(@Req() req) {
    const { user } = req;
    return await this.userService.findAllUser(user);
  }
}
