import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AbstractEntity, AbstractRepository } from "src/database";
import { Column, Entity, Repository } from "typeorm";

// Definition of a user
@Entity('users')
export class User extends AbstractEntity<User> {
    @Column({ name: 'first_name' })
    firstName: string;
    @Column({ name: 'last_name' })
    lastName: string;
    @Column()
    phone: string;
    @Column()
    email: string
    @Column()
    password: string
    @Column({ name: 'referal_id', default: '' })
    referalId: string
    @Column({default: ''})
    image: string
}


// Implementation of User Repository
@Injectable()
export class UsersRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UsersRepository.name);
    constructor (@InjectRepository(User) userRepository: Repository<User>) {
        super(userRepository)
    }
}
