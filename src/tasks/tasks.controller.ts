import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskReqDto } from './dto/create-task.dto';
import { Task } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskReqDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
