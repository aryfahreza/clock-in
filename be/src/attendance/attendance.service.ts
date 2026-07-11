import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { User } from 'src/users/user.entity';
import { AttendanceStatus } from './attendance-status.enum';
import { time } from 'console';

@Injectable()
export class AttendanceService {
    
    constructor(
        @InjectRepository(Attendance)
        private readonly attendanceRepository: Repository<Attendance>
    ) {}

    async checkIn(user: User) {
        const startDt = new Date();
        startDt.setHours(0, 0, 0, 0,);

        const endDt = new Date();
        endDt.setHours(23, 59, 59, 999);

        const attendance = await this.attendanceRepository.findOne({
            where: {
                user: {
                    id: user.id
                },
                time: Between(startDt, endDt),
            }
        });

        if(attendance) {
            throw new BadRequestException('Already check in');
        }

        await this.attendanceRepository.save({
            user: user,
            time: new Date(),
            status: AttendanceStatus.CHECKIN
        });

        return {
            code: '00',
            message: 'SUCCESS'
        } 
    }

    async checkOut(user: User) {
        const startDt = new Date();
        startDt.setHours(0, 0, 0, 0,);

        const endDt = new Date();
        endDt.setHours(23, 59, 59, 999);

        const attendance = await this.attendanceRepository.findOne({
            where: {
                user: {
                    id: user.id
                },
                time: Between(startDt, endDt),
            }
        });

        if(attendance != null) {
            if(attendance.status != null && attendance.status == AttendanceStatus.CHECKOUT) {
                throw new BadRequestException('User have been checked out today');
            }

            const checkOut = {
                user: user,
                time: new Date(),
                status: AttendanceStatus.CHECKOUT
            }
            
            await this.attendanceRepository.save(checkOut);
        } else {
            throw new BadRequestException('User have not checked in yet');
        }

        return {
            code: '00',
            message: 'SUCCESS'
        } 
    }

    async getAttendanceStatus(user: User) {
        const startDt = new Date();
        startDt.setHours(0, 0, 0, 0,);

        const endDt = new Date();
        endDt.setHours(23, 59, 59, 999);

        const attendance = await this.attendanceRepository.find({
            where: {
                user: {
                    id: user.id
                },
                time: Between(startDt, endDt),
            },
            order: {
                time: 'ASC',
            },
        });

        return {
            checkIn: attendance?.[0]?.time||"",
            checkOut: attendance?.[1]?.time||"",
        }
    }

    async getAttendanceSummary(user: User) {
        const attendance = this.attendanceRepository.find({
            where: {
                user: {
                    id: user.id
                }
            },
            order: {
                time: 'DESC',
            }
        })

        return attendance;
    }
}
