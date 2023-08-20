import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  NotAcceptableException,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { UsersService } from 'src/users/users.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('register')
  async register(@Body() registerUser: RegisterUserDto): Promise<User> {
    const userList = await this.usersService.findAll({
      email: registerUser.email,
    });
    if (userList && userList.length) {
      throw new NotAcceptableException('Email existed!');
    } else {
      return await this.authService.register(registerUser);
    }
  }

  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() loginUser: LoginUserDto): Promise<any> {
    return await this.authService.login(loginUser);
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }): Promise<any> {
    return await this.authService.refreshToken(refreshToken);
  }
}
