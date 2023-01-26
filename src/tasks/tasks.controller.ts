import { Controller, Get } from '@nestjs/common';
import { Tasks } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Tasks[] {
    return this.tasksService.getAllTasks();
  }
}
