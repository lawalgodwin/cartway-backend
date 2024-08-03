import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Home Page')
@Controller()
export class AppController {
  constructor(private appService: AppService) {}
  @Get('/')
  @ApiOkResponse({ description: 'Cartway Home Page' })
  index() {
    return this.appService.getHomePage();
  }
}
