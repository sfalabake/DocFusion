import { Module } from '@nestjs/common';
import { PrismaModule } from '@/prisma/prisma.module';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { StorageController } from './storage.controller';

@Module({
  imports: [PrismaModule],
  controllers: [FilesController],
  controllers: [FilesController, StorageController],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
