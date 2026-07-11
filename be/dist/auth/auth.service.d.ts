import { JwtService } from '@nestjs/jwt';
import { UsersService } from "../users/users.service";
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    constructor(userService: UsersService, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        role: string;
    }>;
}
