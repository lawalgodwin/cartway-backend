import { Role } from './role.type';

export type JwtPayload = {
  email: string;
  role: Role;
};
