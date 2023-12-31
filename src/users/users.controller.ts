import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  NotFoundException,
  NotAcceptableException,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  Query,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { FilterUserDto } from './dto/filter-user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(ValidationPipe)
  @Get()
  async findAll(@Query() query: FilterUserDto): Promise<any> {
    return await this.usersService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  @UsePipes(ValidationPipe)
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Post()
  async create(@Body() user: CreateUserDto): Promise<User> {
    return await this.usersService.create(user);
  }

  @UsePipes(ValidationPipe)
  @Put(':id')
  async update(
    @Req() req: any,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
  ): Promise<User> {
    const userIdExist = await this.usersService.findOne(id);
    if (!userIdExist) {
      throw new NotAcceptableException('Email existed!');
    }

    return await this.usersService.update(id, {
      ...user,
      updatedBy: req.user.id,
    });
  }

  @Delete(':id')
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<any> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return await this.usersService.delete(id);
  }
}
