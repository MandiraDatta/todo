// src/todo/todo.service.ts (Example)

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // Your working Prisma client

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) {}

  // Function that interacts directly with the Prisma Client
  async create(text: string) {
    // 2. Use the Prisma Client's create method to INSERT the data
    return this.prisma.todo.create({
      data: {
        text: text,
        // The other fields (id, createdAt, completed) will use their defaults
      },
    });
  }

  async findAll() {
    return this.prisma.todo.findMany({
      orderBy: {
        createdAt: 'desc', // Most recent first
      },
    });
  }

  async update(id: string, completed: boolean) {
    return this.prisma.todo.update({
      where: { id },
      data: { completed },
    });
  }

  async delete(id: string) {
    return this.prisma.todo.delete({
      where: { id },
    });
  }
}

