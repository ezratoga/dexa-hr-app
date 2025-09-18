import { IsEmail, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsUUID()
  @IsOptional()
  user_id?: string; // if generated in backend, make optional for API consumers

  @IsOptional()
  employee_id?: number; // auto-generated serial, usually not included in DTO

  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  position: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  photo: string;
}
