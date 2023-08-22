import {
  Controller,
  Post,
  UseGuards,
  Get,
  Body,
  ValidationPipe,
  UsePipes,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Public } from './auth.decorator';
import { ApiResponse } from '@nestjs/swagger';
import { RegisterUserDto } from './dto/register-user.dto';
import { User } from 'src/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req) {
    return this.authService.login(req.user);
  }

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
}
