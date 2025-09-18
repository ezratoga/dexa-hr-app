import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { SummaryService } from './summary.service';

@Controller('monitoring/v1')
export class SummaryController {
  constructor(private readonly summaryService: SummaryService) {}

  @Get('absence-summary-all')
  async GetSummaryAbsenceAll(@Req() req) {
    const { user, headers } = req;
    const tokenUsed = headers['authorization']
    return await this.summaryService.getAllSummary(user, tokenUsed);
  }
}
