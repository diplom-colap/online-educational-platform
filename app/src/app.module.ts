import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { CoursesModule } from './courses/courses.module';
import { LessonsModule } from './lessons/lessons.module';
import { QuizzesModule } from './quizzes/quizzes.module';
import { CommentsModule } from './comments/comments.module';
import { MaterialsModule } from './materials/materials.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    PrismaModule,
    CoursesModule,
    LessonsModule,
    QuizzesModule,
    CommentsModule,
    MaterialsModule,
    UsersModule,
    AuthModule.forRoot({
      // These are the connection details of the app you created on supertokens.com
      connectionURI: process.env.ConnectionURI,
      apiKey: process.env.APIKey,
      appInfo: {
        // Learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo
        appName: 'online-education-platfrom',
        apiDomain: 'http://localhost:3333',
        websiteDomain: 'http://localhost:3333',
        apiBasePath: '/auth',
        websiteBasePath: '/auth',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
