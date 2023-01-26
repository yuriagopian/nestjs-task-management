import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';

import { v4 as uuid } from 'uuid';
import { CreateTaskReqDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { search, status } = filterDto;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }

        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);

    const foundTask = !!task;

    if (!foundTask) {
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
