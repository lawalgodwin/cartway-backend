import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OrdersRepository } from './orders.repository';
import { DatabaseModule } from 'src/database';
import { Order } from './entities/order.entity';

@Module({
  imports: [DatabaseModule.forFeature([Order])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository],
  exports: [OrdersService]
})
export class OrdersModule {}
