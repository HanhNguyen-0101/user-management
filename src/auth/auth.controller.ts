import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUser: RegisterUserDto): Promise<User> {
    return this.authService.register(registerUser);
  }

  @Post('login')
  @UsePipes(ValidationPipe)
  async login(@Body() loginUser: LoginUserDto): Promise<any> {
    return this.authService.login(loginUser);
  }

  @Post('refresh-token')
  async refreshToken(@Body() { refreshToken }): Promise<any> {
    return this.authService.refreshToken(refreshToken);
  }
}
