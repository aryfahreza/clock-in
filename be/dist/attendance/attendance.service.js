"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const attendance_entity_1 = require("./attendance.entity");
const attendance_status_enum_1 = require("./attendance-status.enum");
let AttendanceService = class AttendanceService {
    attendanceRepository;
    constructor(attendanceRepository) {
        this.attendanceRepository = attendanceRepository;
    }
    async checkIn(user) {
        const startDt = new Date();
        startDt.setHours(0, 0, 0, 0);
        const endDt = new Date();
        endDt.setHours(23, 59, 59, 999);
        const attendance = await this.attendanceRepository.findOne({
            where: {
                user: {
                    id: user.id
                },
                checkIn: (0, typeorm_2.Between)(startDt, endDt),
            }
        });
        if (attendance) {
            throw new common_1.BadRequestException('Already check in');
        }
        await this.attendanceRepository.save({
            user: user,
            checkIn: new Date(),
            status: attendance_status_enum_1.AttendanceStatus.CHECKIN
        });
        return {
            code: '00',
            message: 'SUCCESS'
        };
    }
    async checkOut(user) {
        const startDt = new Date();
        startDt.setHours(0, 0, 0, 0);
        const endDt = new Date();
        endDt.setHours(23, 59, 59, 999);
        const attendance = await this.attendanceRepository.findOne({
            where: {
                user: {
                    id: user.id
                },
                checkIn: (0, typeorm_2.Between)(startDt, endDt),
            }
        });
        if (attendance != null) {
            if (attendance.status != null && attendance.status == attendance_status_enum_1.AttendanceStatus.CHECKOUT) {
                throw new common_1.BadRequestException('User have been checked out today');
            }
            attendance.checkOut = new Date();
            attendance.status = attendance_status_enum_1.AttendanceStatus.CHECKOUT;
            await this.attendanceRepository.save(attendance);
        }
        else {
            throw new common_1.BadRequestException('User have not checked in yet');
        }
        return {
            code: '00',
            message: 'SUCCESS'
        };
    }
};
exports.AttendanceService = AttendanceService;
exports.AttendanceService = AttendanceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(attendance_entity_1.Attendance)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], AttendanceService);
//# sourceMappingURL=attendance.service.js.map