import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeProfile } from './profiles.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfileService {
    constructor(
        @InjectRepository(EmployeeProfile)
        private readonly employeeProfileRepo: Repository<EmployeeProfile>
    ) {}
    
    async findAll(user: any): Promise<EmployeeProfile[]> {
        const { position } = user
        
        if (position === 'admin') {
            return await this.employeeProfileRepo.find();
        }

        throw new UnauthorizedException('Unauthorized')
    }

    async getDetailProfile(req: any) {
        try {
            const { user_id, employee_id, email, phone } = req
            const getDetailProfile = await this.employeeProfileRepo.findOne({
                where: { user_id, employee_id }
            });

            if (getDetailProfile) {
                return {
                    ...getDetailProfile,
                    email,
                    phone
                }
            }

            return req;
        } catch (error) {
            return {
                message: 'Gagal mengambil data profile'
            }
        }
    }
}
