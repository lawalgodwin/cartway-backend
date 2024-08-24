import { Injectable, Logger } from "@nestjs/common";
import { AbstractRepository } from "src/database";
import { Order } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class OrdersRepository extends AbstractRepository<Order> {
    protected logger = new Logger(OrdersRepository.name);
    constructor (@InjectRepository(Order) orderRepository: Repository<Order>) {
        super(orderRepository);
    }
}