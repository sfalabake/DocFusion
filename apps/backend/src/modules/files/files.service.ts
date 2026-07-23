import { Injectable, BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import * as crypto from 'crypto';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(userId: string, file: Express.Multer.File) {
    // Validate file
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      throw new BadRequestException('File size exceeds 100MB limit');
    }

    // Create file hash
    const hash = crypto.createHash('sha256').update(file.buffer).digest('hex');

    // Check if file already exists for this user
    const existingFile = await this.prisma.file.findFirst({
      where: { userId, fileHash: hash },
    });

    if (existingFile) {
      throw new BadRequestException('This file has already been uploaded');
    }

    // Create file record
    const savedFile = await this.prisma.file.create({
      data: {
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        originalName: file.originalname,
        fileExtension: file.originalname.split('.').pop() || '',
        fileHash: hash,
        storageUrl: `/uploads/${hash}`,
        userId,
      },
    });

    // TODO: Upload actual file to MinIO/S3

    return savedFile;
  }

  async getFiles(userId: string, skip: number = 0, take: number = 10) {
    const [files, total] = await Promise.all([
      this.prisma.file.findMany({
        where: { userId, deletedAt: null },
        skip,
        take,
        orderBy: { updatedAt: 'desc' },
      }),
      this.prisma.file.count({
        where: { userId, deletedAt: null },
      }),
    ]);

    return {
      files,
      total,
      skip,
      take,
    };
  }

  async getFileById(id: string, userId: string) {
    const file = await this.prisma.file.findUnique({
      where: { id },
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    if (file.userId !== userId) {
      throw new ForbiddenException('You do not have access to this file');
    }

    return file;
  }

  async deleteFile(id: string, userId: string) {
    const file = await this.getFileById(id, userId);

    await this.prisma.file.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    // TODO: Delete actual file from MinIO/S3

    return { message: 'File deleted successfully' };
  }

  async updateFileMetadata(id: string, userId: string, data: any) {
    const file = await this.getFileById(id, userId);

    return this.prisma.file.update({
      where: { id },
      data,
    });
  }
}
