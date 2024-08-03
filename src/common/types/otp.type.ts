import { User } from 'src/resource/users/entities/user.entity';

export type OTP = {
  code: number;
  user: Partial<User>;
};
