import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { User } from 'src/users/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard/roles.guard';
import { Roles } from 'src/auth/roles/roles.decorator';
import { Role } from 'src/users/role.enum';

@Controller('attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService
  ) {}

  @Post('check-in')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async checkIn(@Req() req: Request & {user: User}) {
    return this.attendanceService.checkIn(req.user);
  }

  @Post('check-out')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  async checkOut(@Req() req: Request & {user: User}) {
    return this.attendanceService.checkOut(req.user);
  }
}
