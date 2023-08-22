import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    const isPasswordMatching = await bcrypt.compare(password, user.password);

    if (user && isPasswordMatching) {
      return user;
    }

    return null;
  }

  async validateUserGoogle(details: any): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: details.email,
      },
    });

    if (user) {
      return user;
    }
    const newUser = await this.userRepository.create(details);
    return await this.userRepository.save(newUser);
  }

  async googleLogin(req) {
    if (!req.user) {
      throw new HttpException('No user from google', HttpStatus.NOT_FOUND);
    }
    return this.generateToken({ id: req.user.id, email: req.user.email });
  }

  async login(user: User) {
    return this.generateToken({ id: user.id, email: user.email });
  }

  async register(registerUserDto: RegisterUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email: registerUserDto.email },
    });
    if (user) {
      throw new HttpException('Email existed!', HttpStatus.CONFLICT);
    }

    const hashPassword = await this.hashPassword(registerUserDto.password);
    const newRegisterUserDto = await this.userRepository.create({
      ...registerUserDto,
      password: hashPassword,
    });

    return await this.userRepository.save(newRegisterUserDto);
  }

  private async generateToken(payload: {
    id: string;
    email: string;
  }): Promise<any> {
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      access_token: accessToken,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
