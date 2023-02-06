import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'João',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};
describe('Tasks services', () => {
  let tasksService: TasksService;
  let taskRepository;

  beforeEach(async () => {
    // initialize a nestjs module with tasksService and taskRepository

    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: TaskRepository,
          useFactory: mockTasksRepository,
        },
      ],
    }).compile();

    tasksService = await module.get(TasksService);
    taskRepository = module.get(TaskRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the results', async () => {
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      taskRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasksWithFilters(null, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });

  describe('getTasksById', () => {
    it('calls TasksRepository.findOne and  returns the results', async () => {
      const mockTask = {
        title: 'Test  title',
        description: 'Test desc',
        id: 'someId',
        status: TaskStatus.OPEN,
      };

      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await tasksService.getTaskById('someId', mockUser);

      expect(result).toEqual(mockTask);
    });
  });
});
