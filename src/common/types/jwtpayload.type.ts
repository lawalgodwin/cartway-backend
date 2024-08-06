import { Role } from 'src/enums';

export type JwtPayload = {
  email: string;
  role: Role;
};
