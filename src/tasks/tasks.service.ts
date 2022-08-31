import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { TaskStatus } from './task-status.enum';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TaskRepository) {}

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async deleteTaskById(id: string): Promise<string> {
    const result = await this.tasksRepository.deleteTaskById(id);
    if (!result) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return 'Delete success ' + id;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const result = await this.tasksRepository.updateTaskStatus(id, status);
    if (!result) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return result;
  }
}
