import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class FilterPermissionGroupDto {
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
}
