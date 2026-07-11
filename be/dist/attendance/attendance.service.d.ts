import { Repository } from 'typeorm';
import { Attendance } from './attendance.entity';
import { User } from "../users/user.entity";
export declare class AttendanceService {
    private readonly attendanceRepository;
    constructor(attendanceRepository: Repository<Attendance>);
    checkIn(user: User): Promise<{
        code: string;
        message: string;
    }>;
    checkOut(user: User): Promise<{
        code: string;
        message: string;
    }>;
}
