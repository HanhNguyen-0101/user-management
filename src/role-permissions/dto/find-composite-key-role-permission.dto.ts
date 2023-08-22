import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindCompositeKeyRolePermissionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly permission_id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly role_id: string;
}
