import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.create(user);
  }

  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(id, user);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return await this.usersService.delete(id);
  }
}
