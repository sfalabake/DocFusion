import { Controller, Get, Put, Body, UseGuards, Request, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@Request() req: any) {
    return this.usersService.findById(req.user.id);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put('me')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Request() req: any, @Body() data: any) {
    return this.usersService.updateProfile(req.user.id, data);
  }

  @Get(':id/storage')
  @UseGuards(JwtAuthGuard)
  async getStorageUsage(@Param('id') id: string) {
    return this.usersService.getStorageUsage(id);
  }
}
