import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { TaskStatus } from '../tasks.model';

export class GetTasksFilterDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @IsNotEmpty()
  @IsString()
  search: string;
}
