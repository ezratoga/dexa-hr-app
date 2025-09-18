import { ApiProperty } from '@nestjs/swagger';
import {IsOptional, IsString, Matches } from 'class-validator';

export class AbsenceSummaryDto {
  @IsString()
  @IsOptional()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'start must be in format dd/MM/yyyy',
  })
  @ApiProperty({ nullable: true })
  start_date?: string;

  @IsString()
  @IsOptional()
  @Matches(/^\d{2}\/\d{2}\/\d{4}$/, {
    message: 'start must be in format dd/MM/yyyy',
  })
  @ApiProperty({ nullable: true })
  end_date?: string;
}
