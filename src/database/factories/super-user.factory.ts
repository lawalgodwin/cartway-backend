import { Role } from 'src/enums';
import { User } from 'src/resource/users/entities/user.entity';
import { setSeederFactory } from 'typeorm-extension';
import { config } from 'dotenv';

config();

export default setSeederFactory(User, (faker) => {
  const user = new User({});

  // const sexFlag = faker.number.int(1)
  // const sex: 'male' | 'female' = sexFlag ? 'male' : 'female'

  user.firstName = 'cartway';
  user.lastName = 'cartway';
  user.password = "t3nT05'21";
  user.email = process.env.FIRST_SUPERUSER_EMAIL;
  user.role = Role.SUPERADMIN;
  user.phone = '08108017555';
  user.image = faker.image.urlPlaceholder();
  return user;
});
