import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    HttpException,
    HttpStatus,
    Delete,
    Put,
} from '@nestjs/common';

import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dtos/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    async create(@Body() createTaskDto: CreateTaskDto) {
        try {
            return this.tasksService.create(createTaskDto);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: error || 'ERROR CREATE TASK',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                },
            );
        }
    }

    @Get()
    async findAll() {
        try {
            return this.tasksService.findAll();
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: error || 'ERROR FIND ALL TASKS',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                },
            );
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        try {
            return this.tasksService.findOne(id);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: error || 'ERROR FIND TASK',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                },
            );
        }
    }

    @Post('update/:id')
    async update(
        @Param('id') id: string,
        @Body() createTaskDto: CreateTaskDto,
    ) {
        try {
            return this.tasksService.update(id, createTaskDto);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: error || 'ERROR UPDATE TASK',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                },
            );
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        try {
            return this.tasksService.remove(id);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: error || 'ERROR REMOVE TASK',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                },
            );
        }
    }

    @Put(':id/completed')
    async setCompletedTask(@Param('id') id: string) {
        try {
            return this.tasksService.setCompletedTask(id);
        } catch (error) {
            throw new HttpException(
                {
                    status: HttpStatus.FORBIDDEN,
                    error: error || 'ERROR SET COMPLETED TASK',
                },
                HttpStatus.FORBIDDEN,
                {
                    cause: error,
                },
            );
        }
    }
}
