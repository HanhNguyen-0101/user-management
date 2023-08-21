import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRolePermissionDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly permissionId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  readonly roleId: string;
}
