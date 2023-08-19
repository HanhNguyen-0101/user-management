import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  @IsUUID()
  readonly updatedBy: string;

  readonly firstName: string;
  readonly lastName: string;
  readonly globalId: string;
  readonly officeCode: string;
  readonly country: string;
}
