import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<User[]>;
    createUser(dto: CreateUserDto): Promise<{
        message: string;
    }>;
    getProfile(req: Request & {
        user: User;
    }): Promise<User | null>;
}
