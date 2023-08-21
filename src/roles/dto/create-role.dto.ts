import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  readonly description: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  readonly updatedBy: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  readonly createdBy: string;
}
