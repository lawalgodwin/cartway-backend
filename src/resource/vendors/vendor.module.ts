import { Module } from '@nestjs/common';
import { VendorController } from './controllers/vendor.controller';
import { VendorService } from './services/vendor.service';
import { UsersModule } from '../users/users.module';
import { MenuService } from './services/menu.service';
import { DatabaseModule } from 'src/database';
import { Menu } from './entities/menu.entity';
import { MenuRepository } from './menu.repository';
import { MenuController } from './controllers/menu.controller';

@Module({
  imports: [DatabaseModule.forFeature([Menu]), UsersModule],
  controllers: [VendorController, MenuController],
  providers: [VendorService, MenuService, MenuRepository],
  exports: [],
})
export class VendorModule {}
