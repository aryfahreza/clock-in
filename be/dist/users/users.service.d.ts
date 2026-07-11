import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): Promise<User[]>;
    createUser(dto: CreateUserDto): Promise<{
        message: string;
    }>;
    findByEmail(email: string): Promise<User | null>;
    findById(id: number): Promise<User | null>;
}
