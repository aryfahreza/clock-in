import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.enum";
import { Attendance } from "src/attendance/attendance.entity";


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    position!: string;

    @Column()
    phone!: string;

     @Column({
        type: 'enum',
        enum: Role,
        default: Role.USER
    })
    role!: string;

    @OneToMany(() => Attendance, (attendance) => attendance.user)
    attendances!: Attendance[];

}