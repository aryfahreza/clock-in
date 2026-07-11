import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(
        private readonly userService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async login(dto: LoginDto) {
        const user = await this.userService.findByEmail(dto.email);
        if(!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const matched = await bcrypt.compare(dto.password, user.password);
        if(!matched) {
            throw new UnauthorizedException('Invalid email or password');
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        }

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            accessToken,
        };

    }
}
