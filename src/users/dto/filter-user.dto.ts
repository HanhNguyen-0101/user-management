import { IsEmail, IsNumberString } from 'class-validator';

export class FilterUserDto {
  @IsNumberString()
  readonly page?: string;

  @IsNumberString()
  readonly item_per_page?: string;

  readonly search?: string;

  @IsEmail()
  readonly email?: string;
}
