import { Controller, Get, Req } from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { EmployeeProfile } from './profiles.entity';

@Controller('profiles/v1')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('findAll')
  getHello(): Promise<EmployeeProfile[]> {
    return this.profileService.findAll();
  }
  
  @Get('get-profile')
  async GetProfile(@Req() req) {
    const { user } = req;
    return await this.profileService.getDetailProfile(user);       
  }
}
