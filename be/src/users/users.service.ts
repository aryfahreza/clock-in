import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './role.enum';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    findAll() {
        return this.userRepository.find({
            where: {
                role: Role.USER,
            },
        });
    }

    async createUser(dto: CreateUserDto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = this.userRepository.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            position: dto.position,
            phone: dto.phone
        });

        await this.userRepository.save(user);

         return {
            message: 'User created successfully',
        };
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({
            where: {
                email: email,
            },
        });
    }

    async findById(id: number): Promise<User | null> {
        return this.userRepository.findOne({
            where: {
                id,
            },
        });
    }
}
