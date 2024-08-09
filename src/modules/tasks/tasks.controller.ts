import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';
import { HandleException } from 'src/decorators/handle-exceptio-decorator.decorator';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    @HandleException('ERROR CREATE TASK')
    async create(@Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(createTaskDto);
    }

    @Get()
    @HandleException('ERROR FIND ALL TASKS')
    async findAll() {
        return this.tasksService.findAll();
    }

    @Get(':id')
    @HandleException('ERROR FIND TASK')
    async findOne(@Param('id') id: string) {
        return this.tasksService.findOne(id);
    }

    @Post('update/:id')
    @HandleException('ERROR UPDATE TASK')
    async update(
        @Param('id') id: string,
        @Body() createTaskDto: CreateTaskDto,
    ) {
        return this.tasksService.update(id, createTaskDto);
    }

    @Delete(':id')
    @HandleException('ERROR REMOVE TASK')
    async remove(@Param('id') id: string) {
        return this.tasksService.remove(id);
    }

    @Put(':id/completed')
    @HandleException('ERROR SET COMPLETED TASK')
    async setCompletedTask(@Param('id') id: string) {
        return this.tasksService.setCompletedTask(id);
    }

    @Get('user/:userID')
    @HandleException('ERROR GET TASKS BY USER')
    async getByUser(@Param('userID') userID: string) {
        return this.tasksService.getByUser(userID);
    }
}
