import { Module } from '@nestjs/common';
import { HomeController, CalendarController, ProfileController, AppController, TodoController, CatsController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [HomeController, CalendarController, ProfileController, AppController, TodoController, CatsController],
  providers: [AppService],
})
export class AppModule {}
