import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { CommentsModule } from './comments/comments.module';
import { VideosModule } from './videos/videos.module';
import { MaterialsModule } from './materials/materials.module';

@Module({
  imports: [PrismaModule, CoursesModule, LessonsModule, QuizzesModule, CommentsModule, VideosModule, MaterialsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
