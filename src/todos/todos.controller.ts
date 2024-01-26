import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ToggleTodoDto } from './dto/toggle-todo.dto';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<number> {
    return this.todosService.create(createTodoDto);
  }

  @Get()
  findAll() {
    return this.todosService.findAll();
  }

  @Get("notDone")
  findNotDone() {
    return this.todosService.findNotDone();
  }

  @Get("done")
  findDone() {
    return this.todosService.findDone();
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto): Promise<void> {
    return this.todosService.update(id, updateTodoDto);
  }

  @Patch("toggle/:id")
  toggleState(@Param() id: number, @Body() toggleTodoDto: ToggleTodoDto): Promise<void> {
    return this.todosService.toggleState(id, toggleTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.todosService.remove(id);
  }
}
