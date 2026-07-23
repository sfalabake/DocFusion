import { Controller, Post, Body, UseGuards, Request, BadRequestException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('storage')
@UseGuards(JwtAuthGuard)
export class StorageController {
  // This endpoint returns a placeholder presigned URL payload for the client.
  // In production, implement S3/R2 presign logic here.
  @Post('presign')
  async presign(@Request() req: any, @Body() body: { fileName: string; contentType: string }) {
    if (!body?.fileName || !body?.contentType) {
      throw new BadRequestException('Missing fileName or contentType');
    }

    const fileKey = `dev/${Date.now()}_${body.fileName}`;

    // Return placeholder response the frontend can use for direct upload.
    return {
      uploadUrl: `/uploads/${fileKey}`,
      method: 'PUT',
      headers: {
        'Content-Type': body.contentType,
      },
      fileKey,
    };
  }
}
