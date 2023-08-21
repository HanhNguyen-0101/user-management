import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindCompositeKeyUserRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly user_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly role_id: string;
}
