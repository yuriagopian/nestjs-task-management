import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

import { v4 as uuid } from 'uuid';
import { CreateTaskReqDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException('Task was not found');
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskReqDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  removeTask(id: string): void {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex < 0) {
      throw new NotFoundException('Task was not found');
    }

    this.tasks.splice(taskIndex, 1);
  }
  updateTaskStatus(id: string, status: TaskStatus): Task {
    // const task = this.getTaskById(id)
    // task.status = status
    // return task
    const taskIndex = this.tasks.findIndex((task) => task.id === id);
    if (taskIndex < 0) {
      throw new NotFoundException('Task was not found');
    }

    this.tasks[taskIndex].status = status;
    return this.tasks[taskIndex];
  }
}
