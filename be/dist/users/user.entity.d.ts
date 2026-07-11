import { Attendance } from "../attendance/attendance.entity";
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    position: string;
    phone: string;
    role: string;
    attendances: Attendance[];
}
