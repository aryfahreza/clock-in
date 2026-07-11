import { User } from "../users/user.entity";
import { AttendanceStatus } from "./attendance-status.enum";
export declare class Attendance {
    id: number;
    checkIn: Date;
    checkOut: Date;
    status: AttendanceStatus;
    user: User;
}
