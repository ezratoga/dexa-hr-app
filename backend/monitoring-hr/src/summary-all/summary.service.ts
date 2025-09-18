import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class SummaryService {
    constructor(
    ) {}

    async getAllSummary(user: any, token: string) {
        try {
            const[getAllSummary, getAllUsers] = await Promise.all([
                fetch(process.env.ATTENDANCE_SERVICE_BASE_URL + '/attendance/v1/absence-summary-all', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                }),
                fetch(process.env.PROFILE_USER_SERVICE_BASE_URL + '/users/v1/all-users', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token,
                    }
                })
            ])
            if (!getAllSummary.ok) {
                throw new BadRequestException('Ada kesalahan saat mengambil data summary')
            }

            let usersAll: Array<any> = [];
            if (getAllUsers.ok) {
                const allUsersGet = await getAllUsers.json();
                usersAll = usersAll.concat(allUsersGet)
            }

            const response: Array<any> = await getAllSummary.json();
            let getFullSummaryWithUser = response?.map((elem) => {
                let name = usersAll?.find((element: any) => elem?.employee_id === element?.employee_id)?.profile?.name;
                let position = usersAll?.find((element: any) => elem?.employee_id === element?.employee_id)?.profile?.position;

                return {
                    name,
                    position,
                    ...elem
                }
            });

            return getFullSummaryWithUser;
            
        } catch (error) {
            console.error(error);
            throw new InternalServerErrorException('Ada kesalahan teknis')
        }
    }
}
