import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  @Length(0, 255)
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  readonly updatedBy: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly firstName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly lastName: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly globalId: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly officeCode: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly country: string;
}
