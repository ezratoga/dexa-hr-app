import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AttendanceData } from './attendance.entity';
import { Between, Repository } from 'typeorm';
import { AbsenceInDto } from './dto/absence-in.dto';
import { AbsenceResponse } from './dto/response.dto';
import { AbsenceSummaryDto } from './dto/absence-summary-personal.dto';

@Injectable()
export class AttendanceService {
    constructor(
        @InjectRepository(AttendanceData)
        private readonly attendanceData: Repository<AttendanceData>
    ) {}

    async postAbsenceOut(insertAbsence: AbsenceInDto, user: any): Promise<AbsenceResponse> {
        try {
            const { employee_id } = user;
            const { absence_for, work_type } = insertAbsence;
            let absence_in: Date | undefined, absence_out: Date | undefined, work_type_in: string | undefined, work_type_out: string | undefined;

            if (absence_for === 'in') {
                absence_in = new Date();
                work_type_in = work_type
            }

            if (absence_for === 'out') {
                const findLastAbsenceIn = await this.attendanceData.findOne({
                    where: { employee_id },
                    order: { updatedat: -1 }
                });
                absence_in = findLastAbsenceIn?.absence_in
                absence_out = new Date();
                work_type_out = work_type;
            }

            const absenceEmployee = this.attendanceData.create({
                employee_id,
                work_type_in,
                work_type_out,
                absence_in,
                absence_out
            })
            await this.attendanceData.save(absenceEmployee);

            return { message: 'Berhasil melakukan absen' };
        } catch (error) {
            console.error(error);
            throw new Error('Gagal melakukan absen');
        }
    }

    async getSummaryAbsenceItself(filter: AbsenceSummaryDto, user: any): Promise<AttendanceData[] | AbsenceResponse> {
        try {
            const { employee_id } = user;
            const { start_date, end_date } = filter
            let defineStartDate: Date = new Date(start_date!), defineEndDate: Date = new Date(end_date!);

            if (!start_date) {
                let year = new Date().getFullYear();
                let month = new Date().getMonth();

                defineStartDate = new Date(year, month - 1, 1);
            }

            if (!end_date) {
                defineEndDate = new Date();
            }

            const getSummaryAbsence = await this.attendanceData.find({
                where: {
                    createdat: Between(defineStartDate, defineEndDate),
                    employee_id
                },
                order: { createdat: 'desc' }
            })

            return getSummaryAbsence;
        } catch (error) {
            console.error(error);
            throw new Error('Ada kesalahan terjadi');
        }
    }

    async getAllSummary(user: any): Promise<AttendanceData[] | AbsenceResponse> {
        const { position } = user;
        if (position === 'admin') {
            try {
                return await this.attendanceData.find({ order: { createdat: 'desc' } })   
            } catch (error) {
                throw new Error('Terjadi kesalahan saat mengambil data summary')
            }
        }

        throw new UnauthorizedException('Hanya dibolehkan untuk admin HR saja')
    }
}
