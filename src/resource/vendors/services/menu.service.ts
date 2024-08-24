import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/resource/users/users.service';
import { MenuRepository } from '../menu.repository';

@Injectable()
export class MenuService {
  constructor(
    private menuRepository: MenuRepository,
    private userService: UsersService,
  ) {}
  async allMenu(vendorId: string) {}

  async addToMenu() {}

  async updateMenu() {}

  async deleteMenu() {}
}
