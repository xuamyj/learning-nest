import { Get, Controller, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';

// Home
// ---------

@Controller('home')
export class HomeController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('home_main')
  root() {
    return { boards: this.appService.getAllBoardsWithDoneToday(), user_id: this.appService.getUserId() };
  }
}

@Controller('create_board')
export class CreateBoardController {
  constructor(private appService: AppService) {}

  @Get(':id')
  @Render('forms/home_board_create')
  findOne(@Param() params: any) {
    console.log(`/create_board/:id params.id: ${params.id}`);
    return { user_id: params.id };
  }
}

@Controller('edit_board')
export class EditBoardController {
  constructor(private appService: AppService) {}

  @Get(':id')
  @Render('forms/home_board_edit')
  findOne(@Param() params: any) {
    console.log(`/edit_board/:id params.id: ${params.id}`);
    return { board: this.appService.getBoardById(parseInt(params.id)) };
  }
}

@Controller('delete_board')
export class DeleteBoardController {
  constructor(private appService: AppService) {}

  @Get(':id')
  @Render('forms/home_board_delete')
  findOne(@Param() params: any) {
    console.log(`/delete_board/:id params.id: ${params.id}`);
    return { board: this.appService.getBoardById(parseInt(params.id)) };
  }
}

// Calendar
// ---------

@Controller('calendar')
export class CalendarController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('calendar_main')
  root() {
    return { boards: this.appService.getAllBoardsWithBoardDays(), user_id: this.appService.getUserId() };
  }

  @Get(':id')
  @Render('calendar_detail')
  findOne(@Param() params: any) {
    console.log(`/calendar/:id params.id: ${params.id}`);
    return { board: this.appService.getBoardWithBoardDays(parseInt(params.id)) };
  }
}

@Controller('create_day')
export class CreateDayController {
  constructor(private appService: AppService) {}

  @Get(':id')
  @Render('forms/calendar_day_create')
  findOne(@Param() params: any) {
    console.log(`/create_day/:id params.id: ${params.id}`);
    return { board_id: params.id };
  }
}

@Controller('edit_day')
export class EditDayController {
  constructor(private appService: AppService) {}

  @Get(':id')
  @Render('forms/calendar_day_edit')
  findOne(@Param() params: any) {
    console.log(`/edit_day/:id params.id: ${params.id}`);
    return { day: this.appService.getDayById(parseInt(params.id)) };
  }
}

@Controller('delete_day')
export class DeleteDayController {
  constructor(private appService: AppService) {}

  @Get(':id')
  @Render('forms/calendar_day_delete')
  findOne(@Param() params: any) {
    console.log(`/delete_day/:id params.id: ${params.id}`);
    return { day: this.appService.getDayById(parseInt(params.id)) };
  }
}


// Profile
// ---------

@Controller('profile')
export class ProfileController {
  constructor(private appService: AppService) {}

  @Get()
  @Render('profile_main')
  root() {
    return { user_id: this.appService.getUserId() };
  }
}

// Other
// ---------

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
