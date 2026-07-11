import { User } from "src/users/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AttendanceStatus } from "./attendance-status.enum";

@Entity()
export class Attendance {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'timestamp',
        nullable: true,
    })
    time!: Date;

    @Column({
        type: 'enum',
        enum: AttendanceStatus,
    })
    status!: AttendanceStatus;

    @ManyToOne(() => User, (user) => user.attendances)
    user!: User;

}