import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { MenuService } from '../services/menu.service';
import { AdminGuard, AuthenticationGuard, VendorGuard } from 'src/common';
import { CreateMenuDto } from '../dto/create-menu.dto';

@Controller('dishes')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  allMenu() {}

  @Post()
  @UseGuards(AuthenticationGuard, AdminGuard, VendorGuard)
  addMenu(createMenuDto: CreateMenuDto) {}
}
