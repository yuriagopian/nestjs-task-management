import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';

import { CreateTaskReqDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository,
  ) {}

  getTasksWithFilters(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const task = this.tasksRepository.findOne({
      where: {
        id,
      },
    });
    const foundTask = !!task;
    if (!foundTask) {
      throw new NotFoundException(`Task with ${id} was not found`);
    }
    return task;
  }

  async createTask(createTaskDto: CreateTaskReqDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  async removeTask(id: string): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ${id} was not found`);
    }
  }
  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;

    await this.tasksRepository.save(task);
    return task;
  }
}
