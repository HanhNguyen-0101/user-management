import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class FindCompositeKeyRolePermissionDto {
  @ApiProperty()
  @IsOptional()
  @IsUUID()
  readonly permission_id: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  readonly role_id: string;
}
