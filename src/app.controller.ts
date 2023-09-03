import { Get, Controller, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('home')
export class HomeController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('home_main')
  root() {
    return { boards: this.appService.getAllBoardsWithDoneToday() };
  }
}

@Controller('calendar')
export class CalendarController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('calendar_main')
  root() {
    return { boards: this.appService.getAllBoardsWithBoardDays() };
  }

  @Get(':id')
  @Render('calendar_detail')
  findOne(@Param() params: any) {
    console.log(`/calendar/:id params.id: ${params.id}`);
    return { board: this.appService.getBoardWithBoardDays(parseInt(params.id)) };
  }
}

@Controller('profile')
export class ProfileController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('profile_main')
  root() {
    return { user_id: this.appService.getUserId() };
  }
}

@Controller()
export class AppController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('index')
  root() {
    return { message: 'Welcome.' };
  }
}

@Controller('todo')
export class TodoController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('todo')
  root() {
    return { };
  }
}

// ----

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param() params: any): string {
    console.log(params.id);
    return `This action returns a #${params.id} cat`;
  }

  // @Render('home')
  // root() {
  //   return { message: 'Does it work?', other: 'Yes!' };
  // }
}
