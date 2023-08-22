import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreatePermissionGroupDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Length(0, 255)
  readonly name: string;
}
