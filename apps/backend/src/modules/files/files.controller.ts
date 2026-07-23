import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('files')
@UseGuards(JwtAuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Request() req: any, @UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    return this.filesService.uploadFile(req.user.id, file);
  }

  // After client uploads to S3/R2 using presigned URL, register the file metadata
  @Post('register')
  async registerFile(@Request() req: any, @Body() body: { fileKey: string; fileName: string; fileSize: number; mimeType: string }) {
    // For dev placeholder, treat fileKey as local path
    const hash = body.fileKey || `${Date.now()}_${body.fileName}`;

    const savedFile = await this.filesService.registerExternalUpload(req.user.id, {
      fileName: body.fileName,
      fileSize: body.fileSize,
      mimeType: body.mimeType,
      fileKey: hash,
    });

    return savedFile;
  }

  @Get()
  async getFiles(
    @Request() req: any,
    @Query('skip') skip?: string,
    @Query('take') take?: string,
  ) {
    return this.filesService.getFiles(
      req.user.id,
      parseInt(skip || '0'),
      parseInt(take || '10'),
    );
  }

  @Get(':id')
  async getFile(@Request() req: any, @Param('id') id: string) {
    return this.filesService.getFileById(id, req.user.id);
  }

  @Delete(':id')
  async deleteFile(@Request() req: any, @Param('id') id: string) {
    return this.filesService.deleteFile(id, req.user.id);
  }

  @Patch(':id')
  async updateFile(
    @Request() req: any,
    @Param('id') id: string,
    @Body() data: any,
  ) {
    return this.filesService.updateFileMetadata(id, req.user.id, data);
  }
}
