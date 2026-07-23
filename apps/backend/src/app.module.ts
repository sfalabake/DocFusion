import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { FilesModule } from './modules/files/files.module';
import { CommentsModule } from './modules/comments/comments.module';
import { AnnotationsModule } from './modules/annotations/annotations.module';
import { CollaborationsModule } from './modules/collaborations/collaborations.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    AuthModule,
    UsersModule,
    FilesModule,
    CommentsModule,
    AnnotationsModule,
    CollaborationsModule,
    SubscriptionsModule,
    NotificationsModule,
  ],
})
export class AppModule {}
