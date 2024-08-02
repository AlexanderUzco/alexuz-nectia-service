import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task, TaskDocument } from './schemas/tasks.schame';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dtos/create-task.dto';
import { EDatabaseName } from 'src/common/constants/database.constants';

@Injectable()
export class TasksService {
    constructor(
        @InjectModel(Task.name, EDatabaseName.AUTH)
        private readonly taskModel: Model<TaskDocument>,
    ) {}

    async create(task: CreateTaskDto) {
        const newTask = new this.taskModel(task);
        return newTask.save();
    }

    async findAll() {
        return this.taskModel.find().exec();
    }

    async findOne(id: string) {
        return this.taskModel.findById(id).exec();
    }

    async update(id: string, task: CreateTaskDto) {
        const updateTask = await this.taskModel.findByIdAndUpdate(
            { _id: id },
            task,
            { new: false },
        );

        return updateTask;
    }

    async remove(id: string) {
        return this.taskModel.deleteOne({ _id: id }).exec();
    }

    async setCompletedTask(id: string) {
        const task = await this.taskModel.findById(id).exec();
        task.completed = !task.completed;
        return task.save();
    }
}
