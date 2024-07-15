import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractRepository } from "src/database/abstract.repository";
import { Repository } from "typeorm";
import { User } from "./entities/user.entity";

// Implementation of User Repository
@Injectable()
export class UsersRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UsersRepository.name);
    constructor (@InjectRepository(User) userRepository: Repository<User>) {
        super(userRepository)
    }
}
