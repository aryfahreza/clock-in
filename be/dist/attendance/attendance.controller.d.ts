import { AttendanceService } from './attendance.service';
import { User } from "../users/user.entity";
export declare class AttendanceController {
    private readonly attendanceService;
    constructor(attendanceService: AttendanceService);
    checkIn(req: Request & {
        user: User;
    }): Promise<{
        code: string;
        message: string;
    }>;
    checkOut(req: Request & {
        user: User;
    }): Promise<{
        code: string;
        message: string;
    }>;
}
