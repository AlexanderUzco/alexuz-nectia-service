import { Module } from '@nestjs/common';
import { getConnectionToken, MongooseModule } from '@nestjs/mongoose';
import { Task, TaskSchema } from './schemas/tasks.schame';
import { EDatabaseName } from 'src/common/constants/database.constants';
import { UsersModule } from '../users/users.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
    imports: [
        MongooseModule.forFeatureAsync(
            [
                {
                    name: Task.name,
                    useFactory: () => {
                        const schema = TaskSchema;
                        //schema.plugin(require('mongoose-autopopulate'));
                        return schema;
                    },
                    inject: [getConnectionToken(EDatabaseName.AUTH)],
                },
            ],
            EDatabaseName.AUTH,
        ),
        UsersModule,
    ],
    controllers: [TasksController],
    providers: [TasksService],
    exports: [TasksService],
})
export class TaskModule {}
