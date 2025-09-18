import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { EmployeeProfile } from 'src/profiles/v1/profiles.entity';
import { LoginUserDTO } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(Users)
        private readonly userRepository: Repository<Users>,
        @InjectRepository(EmployeeProfile)
        private readonly profileRepository: Repository<EmployeeProfile>,
        private readonly jwtService: JwtService
    ) {}

    async registerUser(register: CreateUserDto) {
        try {
            const { name, position, photo, email, password, phone } = register;

            const hashedPassword = await bcrypt.hash(password, 10);
            const userData = await this.userRepository.create({
                email,
                password: hashedPassword,
                phone
            });
            const getData = await this.userRepository.save(userData);

            const profileEmployee = this.profileRepository.create({
                user_id: getData.user_id,
                employee_id: getData.employee_id,
                name,
                position,
                photo
            })
            const registerTheUser = await this.profileRepository.save(profileEmployee);

            let response = {
                ...getData,
                ...registerTheUser
            };

            return response;   
        } catch (error) {
            console.error(error);
            return {
                message: 'Ada kesalahan terjadi'
            }
        }
    }

    async loginUser(login: LoginUserDTO) {
        const { email, password } = login;

        const findUserData = await this.userRepository.findOne({
            where: { email },
        });
        const hashedPassword = findUserData?.password;

        try {
            const comparingPassword = await bcrypt.compare(password, hashedPassword!);
            if (comparingPassword) {
                try {
                    const getProfile = await this.profileRepository.findOne({where: { employee_id: findUserData?.employee_id } })
                    if (getProfile) {
                        let fullEmployeeProfile = {
                            name: getProfile.name,
                            position: getProfile.position,
                            ...findUserData,
                        }

                        const tokenGeneration = this.jwtService.sign(fullEmployeeProfile);

                        return {
                            token: tokenGeneration
                        }
                    }
                } catch (error) {
                    console.error(error);
                    throw new Error('Terjadi kesalahan saat validasi user')
                }
            }
        } catch (error) {
            console.error(error)
            throw new Error('Terjadi kesalahan saat validasi password')
        }

        throw new UnauthorizedException('Unauthorized')
    }

    async updateUser(updateUser: UpdateUserDto, user: any) {
        try {
            let { employee_id, user_id, email } = user;
            let { password, phone, photo } = updateUser;

            let updatedFieldUser: any = {
                updatedat: new Date()
            };
            let updatedFieldProfile: any = {
                updatedat: new Date()
            };

            if (phone) {
                updatedFieldUser.phone = phone;
            } 

            if (photo) {
                updatedFieldProfile.photo = photo;
            } 

            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updatedFieldUser.password = hashedPassword;
            }
            
            await Promise.all([
                this.userRepository.update(
                    { user_id, employee_id },
                    updatedFieldUser
                ),
                this.profileRepository.update(
                    { employee_id, user_id },
                    updatedFieldProfile
                )
            ]);
            
            const [updateUserDB, updateProfileDB] = await Promise.all([
                this.userRepository.findOne({ where: { employee_id, user_id } }),
                this.profileRepository.findOne({ where: { employee_id, user_id } })
            ])

            let response = {
                ...updateUserDB,
                ...updateProfileDB
            };

            return {
                data: response,
                message: 'Berhasil mengubah user!'
            }

        } catch (error) {
            console.error(error);
            return { message: 'Ada kesalahan terjadi' };
        }
    }

    async loginUserAdmin(login: LoginUserDTO) {
        const { email, password } = login;
        
        const findUserData = await this.userRepository.findOne({
            where: { email },
        });
        const hashedPassword = findUserData?.password;

        try {
            const comparingPassword = await bcrypt.compare(password, hashedPassword!);
            if (comparingPassword) {
                const getProfile = await this.profileRepository.findOne({where: { employee_id: findUserData?.employee_id } })
                if (getProfile && getProfile?.position === 'admin') {
                    let fullEmployeeProfile = {
                        name: getProfile.name,
                        position: getProfile.position,
                        ...findUserData,
                    }

                    const tokenGeneration = this.jwtService.sign(fullEmployeeProfile);

                    return {
                        token: tokenGeneration
                    }
                }
            }               
        } catch (error) {
            throw new Error('Ada kesalahan saat validasi password')
        }

        throw new UnauthorizedException('Unauthorized')
    }

    async updateUserAdmin(updateUser: UpdateUserDto, user: any) {
        try {
            let { employee_id, user_id, email } = user;
            let { password, phone, photo } = updateUser;

            let updatedFieldUser: any = {
                updatedat: new Date()
            };
            let updatedFieldProfile: any = {
                updatedat: new Date()
            };

            if (phone) {
                updatedFieldUser.phone = phone;
            } 

            if (photo) {
                updatedFieldProfile.photo = photo;
            } 

            if (password) {
                const hashedPassword = await bcrypt.hash(password, 10);
                updatedFieldUser.password = hashedPassword;
            }
            
            await Promise.all([
                this.userRepository.update(
                    { user_id, employee_id },
                    updatedFieldUser
                ),
                this.profileRepository.update(
                    { employee_id, user_id },
                    updatedFieldProfile
                )
            ]);
            
            const [updateUserDB, updateProfileDB] = await Promise.all([
                this.userRepository.findOne({ where: { employee_id, user_id } }),
                this.profileRepository.findOne({ where: { employee_id, user_id } })
            ])

            let response = {
                ...updateUserDB,
                ...updateProfileDB
            };

            return {
                data: response,
                message: 'Berhasil mengubah user!'
            }

        } catch (error) {
            console.error(error);
            return { message: 'Ada kesalahan terjadi' };
        }
    }

    async findAllUser(user: any): Promise<any>{
        const { position } = user;
        if (position === 'admin') {
            try {
                const findAllUserAndProfile = await this.userRepository
                    .createQueryBuilder('user')
                    .leftJoinAndSelect('user.profile', 'profile')
                    .select([
                        'user.employee_id',
                        'profile.name',
                        'profile.position',
                        'user.email',
                        'user.phone',
                    ])
                    .getMany()
                
                return findAllUserAndProfile;
            } catch (error) {
                console.error(error);
                throw new Error('Gagal menampilkan data summary keseluruhan')
            }
        }

        throw new Error('Terjadi kesalahan teknis')
    }
}
