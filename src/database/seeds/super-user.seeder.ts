import { Role } from 'src/enums';
import { User } from 'src/resource/users/entities/user.entity';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';

export default class UserSeeder implements Seeder {
  track?: boolean;
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    await dataSource.query('TRUNCATE "users" RESTART IDENTITY;'); // This empties/clears the users table
    const userFactory = factoryManager.get(User);
    await userFactory.save();
  }
}
