import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UsersService } from '../users.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserSeed {
    constructor(private readonly userService: UsersService) {}

    @Command({
        command: 'create:users',
        describe: 'Create Users',
    })
    async create() {
        const users: CreateUserDto[] = [
            {
                _id: '66ac2a3fe18abda72f94e8e9',
                name: 'Root',
                lastname: 'Admin',
                email: 'root@admin.io',
                password: 'admin',
                origin: 'Web',
                role: 'ADMIN',
            },
            {
                name: 'Jane',
                lastname: 'Smith',
                email: 'jane.smith@example.com',
                password: 'password123',
                origin: 'Mobile',
                role: 'USER',
            },
            {
                name: 'Alice',
                lastname: 'Johnson',
                email: 'alice.johnson@example.com',
                password: 'password123',
                origin: 'Web',
                role: 'USER',
            },
            {
                name: 'Bob',
                lastname: 'Brown',
                email: 'bob.brown@example.com',
                password: 'password123',
                origin: 'Mobile',
                role: 'USER',
            },
        ];

        for (const user of users) {
            await this.userService.createUser(user);

            if (user.role === 'ADMIN') {
                console.log(`Admin ${user.email} created`);
                continue;
            }
            console.log(`User ${user.email} created`);
        }
    }
}
