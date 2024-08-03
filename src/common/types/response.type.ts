import { User } from 'src/resource/users/entities/user.entity';

export type UserCreationResponseType = Omit<
  User,
  'role' | 'password' | 'hashPassword'
>;
export type UserFindResponseType = Omit<
  User,
  'role' | 'password' | 'hashPassword'
>;
export type UserUpdateResponseType = Omit<User, 'password' | 'hashPassword'>;
export type UserDeleteResponseType = object;
