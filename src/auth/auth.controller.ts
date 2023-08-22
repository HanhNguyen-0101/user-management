import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Public } from './auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post('register')
  async register(@Body() registerUser: RegisterUserDto): Promise<User> {
    return await this.authService.register(registerUser);
  }

  @Public()
  @UsePipes(ValidationPipe)
  @Post('login')
  async login(@Body() loginUser: LoginUserDto): Promise<any> {
    return await this.authService.login(loginUser);
  }

  @Public()
  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }): Promise<any> {
    return await this.authService.refreshToken(refreshToken);
  }
}
