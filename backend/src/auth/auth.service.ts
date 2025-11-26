import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(data: any) {
    const hashed = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        username: data.username,
        password: hashed,
      },
    });
  }

  async login(data: any) {
    const user = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (!user) return { success: false, message: "User not found" };

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) return { success: false, message: "Incorrect password" };

    return { success: true, user };
  }
}
