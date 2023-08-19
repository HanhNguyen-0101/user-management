import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  readonly updatedBy: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly globalId: string;
  readonly officeCode: string;
  readonly country: string;
}
