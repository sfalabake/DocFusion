import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async updateProfile(id: string, data: { firstName?: string; lastName?: string; avatar?: string }) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        avatar: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getStorageUsage(id: string) {
    const files = await this.prisma.file.findMany({
      where: { userId: id },
      select: { fileSize: true },
    });

    const totalSize = files.reduce((sum, file) => sum + file.fileSize, 0);
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId: id },
    });

    return {
      used: totalSize,
      limit: subscription?.storageLimit || 0,
      percentage: ((totalSize / (subscription?.storageLimit || 1)) * 100).toFixed(2),
    };
  }
}
