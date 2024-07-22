import { AbstractEntity } from 'src/database';
import { BeforeInsert, Column, Entity } from 'typeorm';
import { getHashedPassword } from '../../../helpers';
import { Role } from 'src/enums';

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
  email: string;
  @Column()
  password: string;
  @Column({ name: 'referal_id', default: '' })
  referalId: string;
  @Column({ default: '' })
  image: string;
  @Column({ type: 'enum', enum: Role, default: Role.CUSTOMER })
  role: Role;

  @BeforeInsert()
  async hashPassword() {
    this.password = await getHashedPassword(this.password);
  }
}
