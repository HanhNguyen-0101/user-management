import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

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
      refreshToken: 'refresh_token',
      password: hashPassword,
    });

    return await this.userRepository.save(newRegisterUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: {
        email: loginUserDto.email,
      },
    });

    if (!user) {
      throw new HttpException('Email is not exist', HttpStatus.BAD_REQUEST);
    }
    const isPasswordMatching = await bcrypt.compare(
      loginUserDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.generateToken({ id: user.id, email: user.email });
  }

  async refreshToken(token: string): Promise<any> {
    try {
      const verify = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      const hasExistToken = await this.userRepository.findOneBy({
        email: verify.email,
        refreshToken: token,
      });
      if (hasExistToken) {
        return this.generateToken({ id: verify.id, email: verify.email });
      } else {
        throw new HttpException('token is not valid', HttpStatus.BAD_REQUEST);
      }
    } catch {
      throw new HttpException('token is not valid', HttpStatus.BAD_REQUEST);
    }
  }

  private async generateToken(payload: {
    id: string;
    email: string;
  }): Promise<any> {
    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: jwtConstants.secret,
      expiresIn: jwtConstants.expiresIn,
    });
    await this.userRepository.update(
      { email: payload.email },
      { refreshToken },
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  private async hashPassword(password: string): Promise<string> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }
}
