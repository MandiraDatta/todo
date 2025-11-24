import { Module } from '@nestjs/common';
import { TodoController } from './app.controller';
import { TodoService } from './todo.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
