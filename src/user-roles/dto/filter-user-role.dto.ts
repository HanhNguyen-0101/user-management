import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterUserRoleDto {
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
  @IsString()
  readonly search?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  readonly user_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  readonly role_id?: string;
}
