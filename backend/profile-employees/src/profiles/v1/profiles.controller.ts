import { Controller, Get, Req, Param } from '@nestjs/common';
import { ProfileService } from './profiles.service';
import { EmployeeProfile } from './profiles.entity';

@Controller('profiles/v1')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('findAll')
  async getHello(@Req() req): Promise<EmployeeProfile[]> {
    const { user } = req;
    return await this.profileService.findAll(user);
  }
  
  @Get('get-profile')
  async GetProfile(@Req() req) {
    const { user } = req;
    return await this.profileService.getDetailProfile(user);       
  }

  @Get(':id')
  async getProfileById(@Param('id') id: string): Promise<any> {
    return await this.profileService.getProfileById(id);
  }
}
