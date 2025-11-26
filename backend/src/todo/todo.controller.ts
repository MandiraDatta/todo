// src/todo/todo.controller.ts (Example)

import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { TodoService } from './todo.service'; // Assuming you have a TodoService

@Controller('todos') // Base route for all todo-related endpoints
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post() // Handles POST requests to /todos
  async createTodo(
    // NestJS will automatically extract the JSON body data and assign it to the 'taskText' variable
    @Body('text') taskText: string, 
  ) {
    // 1. Pass the received data to the service layer for database interaction
    return this.todoService.create(taskText);
  }
  
  @Get()
  async findAll() {
    return this.todoService.findAll();
  }

  @Patch(':id') // Handles PATCH requests to /todos/:id
  async updateTodo(
    @Param('id') id: string,
    @Body('completed') completed: boolean,
  ) {
    return this.todoService.update(id, completed);
  }

  @Delete(':id') // Handles DELETE requests to /todos/:id
  async deleteTodo(@Param('id') id: string) {
    return this.todoService.delete(id);
  }
}



