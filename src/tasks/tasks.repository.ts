import { Injectable } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskReqDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TaskRepository extends Repository<Task> {
  constructor(private dataSource: DataSource) {
    super(Task, dataSource.createEntityManager());
  }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere('task.status= :status', { status });
    }

    if (search) {
      query.andWhere(
        'LOWER(task.title)  LIKE LOWER(:search) OR LOWER(task.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(
    { title, description }: CreateTaskReqDto,
    user: User,
  ): Promise<Task> {
    const task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    await this.save(task);
    return task;
  }
}
