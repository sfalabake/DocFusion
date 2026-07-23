import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

export interface CreateAnnotationDto {
  type: 'highlight' | 'underline' | 'note' | 'draw' | 'text';
  pageNumber: number;
  content?: string;
  coordinates: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  color?: string;
}

export interface UpdateAnnotationDto {
  type?: string;
  content?: string;
  coordinates?: any;
  color?: string;
}

@Injectable()
export class AnnotationsService {
  constructor(private prisma: PrismaService) {}

  async createAnnotation(
    fileId: string,
    userId: string,
    data: CreateAnnotationDto
  ) {
    // Verify user owns the file
    const file = await this.prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    if (file.userId !== userId) {
      throw new ForbiddenException('You do not have access to this file');
    }

    // Create annotation
    return this.prisma.annotation.create({
      data: {
        type: data.type,
        pageNumber: data.pageNumber,
        content: data.content,
        coordinates: data.coordinates,
        color: data.color,
        fileId,
        userId,
      },
    });
  }

  async getAnnotations(fileId: string, userId: string, pageNumber?: number) {
    // Verify user owns the file
    const file = await this.prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    if (file.userId !== userId) {
      throw new ForbiddenException('You do not have access to this file');
    }

    // Get annotations
    const where: any = { fileId };
    if (pageNumber) {
      where.pageNumber = pageNumber;
    }

    return this.prisma.annotation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateAnnotation(
    annotationId: string,
    userId: string,
    data: UpdateAnnotationDto
  ) {
    const annotation = await this.prisma.annotation.findUnique({
      where: { id: annotationId },
    });

    if (!annotation) {
      throw new NotFoundException('Annotation not found');
    }

    if (annotation.userId !== userId) {
      throw new ForbiddenException('You do not have access to this annotation');
    }

    return this.prisma.annotation.update({
      where: { id: annotationId },
      data,
    });
  }

  async deleteAnnotation(annotationId: string, userId: string) {
    const annotation = await this.prisma.annotation.findUnique({
      where: { id: annotationId },
    });

    if (!annotation) {
      throw new NotFoundException('Annotation not found');
    }

    if (annotation.userId !== userId) {
      throw new ForbiddenException('You do not have access to this annotation');
    }

    return this.prisma.annotation.delete({
      where: { id: annotationId },
    });
  }
}
