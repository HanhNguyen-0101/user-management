import { IsEmail, IsNotEmpty, IsUUID } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly password: string;

  @IsUUID()
  readonly updatedBy: string;

  readonly firstName: string;
  readonly lastName: string;
  readonly globalId: string;
  readonly officeCode: string;
  readonly country: string;
}
