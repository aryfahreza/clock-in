import { Module } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Attendance } from './attendance.entity';

@Module({
  imports: [
      TypeOrmModule.forFeature([
        Attendance,
        User,
      ]),
    ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}
