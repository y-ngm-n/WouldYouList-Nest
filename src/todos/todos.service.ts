import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private todosRepository: Repository<Todo>
  ) {}

  async create(createTodoDto: CreateTodoDto): Promise<number> {
    const result = await this.todosRepository.insert(createTodoDto);
    return result.identifiers[0].id;
  }

  async findAll(): Promise<Todo[]> {
    const result = await this.todosRepository.find();
    return result;
  }

  async findNotDone() {
    const result = await this.todosRepository.findBy({ state: false });
    return result;
  }

  async findDone() {
    const result = await this.todosRepository.findBy({ state: true });
    return result;
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<void> {
    await this.todosRepository.update({ id }, updateTodoDto);
  }

  async toggleState(id: number) {
    const todo = await this.todosRepository.findOneBy({ id });
    await this.todosRepository.update({ id }, { state: !(todo.state) });
  }

  async setReview(id: number, reviewId: number) {
    const todo = await this.todosRepository.findOneBy({ id });
    await this.todosRepository.update({ id }, { reviewId });
  }

  async remove(id: number): Promise<void> {
    await this.todosRepository.delete({ id });
  }
}
