// src/employee-profile/dto/employee-profile-response.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString } from 'class-validator';

export class AbsenceInDto {
  @IsString()
  @ApiProperty({ enum: ['in', 'out'] })
  @IsIn(['in', 'out'])
  absence_for?: string;

  @IsString()
  @IsOptional()
  @IsIn(['WFH', 'WFO'])
  @ApiProperty({ enum: ['WFH', 'WFO'], nullable: true })
  work_type?: string;
}
