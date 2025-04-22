import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private readonly todoRepo: Repository<Todo>,
    @InjectRepository(User) private readonly userRepo: Repository<User>
  ) {}

  async findAll(userId: string) {
    return this.todoRepo.find({ where: { user: { id: userId } } });
  }

  async create(userId: string, data: { title: string; description?: string }) {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new NotFoundException('Usuário não encontrado');
    const todo = this.todoRepo.create({ ...data, user });
    return this.todoRepo.save(todo);
  }

  async update(id: string, userId: string, data: Partial<Todo>) {
    const todo = await this.todoRepo.findOne({ where: { id }, relations: ['user'] });
    if (!todo || todo.user.id !== userId) throw new NotFoundException();
    Object.assign(todo, data);
    return this.todoRepo.save(todo);
  }

  async remove(id: string, userId: string) {
    const todo = await this.todoRepo.findOne({ where: { id }, relations: ['user'] });
    if (!todo || todo.user.id !== userId) throw new NotFoundException();
    return this.todoRepo.remove(todo);
  }
}