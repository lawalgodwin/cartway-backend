import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from 'src/database';
import { Menu } from './entities/menu.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MenuRepository extends AbstractRepository<Menu> {
  protected readonly logger = new Logger(MenuRepository.name);
  constructor(@InjectRepository(Menu) menuRepository: Repository<Menu>) {
    super(menuRepository);
  }
}
