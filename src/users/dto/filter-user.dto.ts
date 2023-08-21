import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterUserDto {
  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  readonly page?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  readonly item_per_page?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly search?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  readonly email?: string;
}
