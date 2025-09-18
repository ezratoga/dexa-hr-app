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

    async getProfileById(id: string): Promise<any> {
        const employee_id = parseInt(id);
        const profile = await this.employeeProfileRepo.findOne({
            where: { employee_id },
            relations: ['user'],
        });
        
        let responseDetail = {
            employee_id: profile?.employee_id,
            name: profile?.name,
            position: profile?.position,
            photo: profile?.photo,
            email: profile?.user?.email,
            phone: profile?.user?.phone
        }

        return responseDetail
    }
}
