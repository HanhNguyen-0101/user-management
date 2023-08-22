import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateMenuDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  readonly key: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @Length(0, 255)
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  readonly parentId: string;
}
