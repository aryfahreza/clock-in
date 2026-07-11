import { User } from "../users/user.entity";
import { AttendanceStatus } from "./attendance-status.enum";
export declare class Attendance {
    id: number;
    time: Date;
    status: AttendanceStatus;
    user: User;
}
