import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsUUID } from 'class-validator';

export class FilterRolePermissionDto {
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
  @IsUUID()
  readonly permission_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  readonly role_id?: string;
}
