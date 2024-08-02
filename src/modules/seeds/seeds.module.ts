import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { UserSeed } from '../users/seeds/users.seed';
import { UsersModule } from '../users/users.module';
import { TaskSeed } from '../tasks/seeds/tasks.seed';
import { TaskModule } from '../tasks/tasks.module';
@Module({
    imports: [CommandModule, UsersModule, TaskModule],
    providers: [UserSeed, TaskSeed],
    exports: [UserSeed, TaskSeed],
})
export class SeedsModule {}
