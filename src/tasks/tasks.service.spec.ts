import { Test } from '@nestjs/testing';
import { TaskRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
});

const mockUser = {
  username: 'João',
  id: 'someId',
  password: 'somePassword',
  tasks: [],
};
describe('Tasks services', () => {
  let tasksService: TasksService;
  let taskRepository: TaskRepository;

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
    it('calls TasksRepository.getTasks anda returns the results', () => {
      expect(taskRepository.getTasks).not.toHaveBeenCalled();

      tasksService.getTasksWithFilters(null, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
    });
  });
});
