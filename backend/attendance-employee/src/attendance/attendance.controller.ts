import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceData } from './attendance.entity';
import { AbsenceInDto } from './dto/absence-in.dto';
import { AbsenceResponse } from './dto/response.dto';
import { AbsenceSummaryDto } from './dto/absence-summary-personal.dto';

@Controller('attendance/v1')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}
  
  @Post('absence-employee')
  async InsertAbsence(@Body() insertAbsence: AbsenceInDto, @Req() req): Promise<AbsenceResponse> {
    const { user } = req;
    return await this.attendanceService.postAbsenceOut(insertAbsence, user)      
  }

  @Get('absence-summary')
  async GetSummaryAbsenceItself(@Query() filter: AbsenceSummaryDto, @Req() req) {
    const { user } = req;
    return await this.attendanceService.getSummaryAbsenceItself(filter, user)
  }

  @Get('absence-summary-all')
  async GetSummaryAbsenceAll(@Req() req) {
    const { user } = req;
    return await this.attendanceService.getAllSummary(user);
  }
}
