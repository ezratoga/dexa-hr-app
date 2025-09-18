// src/employee-profile/dto/employee-profile-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class EmployeeProfileDto {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  employee_id: string;

  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  position?: string;

  @ApiProperty({ required: false })
  photo?: string;

  @ApiProperty()
  createdat: Date;

  @ApiProperty()
  updatedat: Date;
}
