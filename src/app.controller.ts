import { Get, Controller, Render, Param } from '@nestjs/common';
// import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  @Get()
  @Render('home')
  root() {
    return { message: 'Does it reload by itself? (No)', other: 'Other' };
  }

  // getHello(): string {
  //   return this.appService.getHello();
  // }
}

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
