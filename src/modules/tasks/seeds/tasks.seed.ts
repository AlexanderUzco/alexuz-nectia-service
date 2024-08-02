import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';
import { TasksService } from '../tasks.service';
import { CreateTaskDto } from '../dtos/create-task.dto';

@Injectable()
export class TaskSeed {
    constructor(private readonly tasksService: TasksService) {}

    @Command({
        command: 'create:tasks',
        describe: 'Seed tasks data',
    })
    async create() {
        // Add your tasks data here
        const tasks: CreateTaskDto[] = [
            {
                title: 'Task 1',
                description: 'Description 1',
                userID: '66ac2a3fe18abda72f94e8e9',
            },
            {
                title: 'Task 2',
                description: 'Description 2',
                userID: '66ac2a3fe18abda72f94e8e9',
            },
            {
                title: 'Task 3',
                description: 'Description 3',
                userID: '66ac2a3fe18abda72f94e8e9',
            },
        ];

        for (const task of tasks) {
            await this.tasksService.create(task);
            console.log(`Task ${task.title} created`);
        }
        console.log('Seed tasks data');
    }
}
