import { Module } from '@nestjs/common';
import { HomeController, CalendarController, ProfileController, CreateBoardController, EditBoardController, DeleteBoardController, CreateDayController, EditDayController, DeleteDayController, AppController, TodoController, CatsController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [
    HomeController, 
    CalendarController, 
    ProfileController, 
    CreateBoardController, 
    EditBoardController,
    DeleteBoardController,
    CreateDayController, 
    EditDayController,
    DeleteDayController,
    AppController, 
    TodoController, 
    CatsController
  ],
  providers: [AppService],
})
export class AppModule {}
