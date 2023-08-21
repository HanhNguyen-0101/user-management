import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString, IsUUID } from 'class-validator';

export class FilterMenuDto {
  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  readonly page?: string;

  @ApiProperty()
  @IsNumberString()
  @IsOptional()
  readonly item_per_page?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  readonly search?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly key?: string;
}
