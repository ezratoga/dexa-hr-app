import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  photo?: string;
}
