import { BadRequestException, Injectable, Req } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { User } from 'src/users/user.entity';
import { AttendanceStatus } from './attendance-status.enum';

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
                checkIn: Between(startDt, endDt),
            }
        });

        if(attendance) {
            throw new BadRequestException('Already check in');
        }

        await this.attendanceRepository.save({
            user: user,
            checkIn: new Date(),
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
                checkIn: Between(startDt, endDt),
            }
        });

        if(attendance != null) {
            if(attendance.status != null && attendance.status == AttendanceStatus.CHECKOUT) {
                throw new BadRequestException('User have been checked out today');
            }

            attendance.checkOut = new Date();
            attendance.status = AttendanceStatus.CHECKOUT

            await this.attendanceRepository.save(attendance);
        } else {
            throw new BadRequestException('User have not checked in yet');
        }

        return {
            code: '00',
            message: 'SUCCESS'
        } 
    }
}
