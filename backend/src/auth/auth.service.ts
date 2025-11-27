import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async register(dto: { username: string; password: string }) {
    try {
      const hashed = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: {
          username: dto.username,
          password: hashed,
        },
      });

      return { success: true, message: "User registered successfully", user };
    } catch (err) {
      return { success: false, message: "Username already exists" };
    }
  }

  async login(data: any) {
    const user = await this.prisma.user.findUnique({
      where: { username: data.username },
    });

    if (!user) return { success: false, message: "User not found" };

    const isValid = await bcrypt.compare(data.password, user.password);

    if (!isValid) return { success: false, message: "Incorrect password" };

    return { success: true, message: "Login successful", user };
  }
}
