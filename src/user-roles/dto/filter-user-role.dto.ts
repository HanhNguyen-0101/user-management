import { IsNumberString, IsUUID } from 'class-validator';

export class FilterUserRoleDto {
  @IsNumberString()
  readonly page?: string;

  @IsNumberString()
  readonly item_per_page?: string;

  readonly search?: string;

  @IsUUID()
  readonly user_id?: string;

  @IsUUID()
  readonly role_id?: string;
}
