import { Get, Controller, Render } from '@nestjs/common';
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
