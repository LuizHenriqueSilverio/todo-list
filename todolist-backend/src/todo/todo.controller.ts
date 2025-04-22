import { Controller, Get, Post, Body, Patch, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
@UseGuards(AuthGuard('jwt'))
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll(@Req() req) {
    return this.todoService.findAll(req.user.userId);
  }

  @Post()
  create(@Req() req, @Body() body) {
    return this.todoService.create(req.user.userId, body);
  }

  @Patch(':id')
  update(@Req() req, @Param('id') id: string, @Body() body) {
    return this.todoService.update(id, req.user.userId, body);
  }

  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.todoService.remove(id, req.user.userId);
  }
}
