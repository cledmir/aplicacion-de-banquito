import { UserRole } from '../enums';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  isPrincipalAdmin?: boolean;
  createdAt: Date;
}

export interface CreateUserRequest {
  email: string;
  password: string;
  displayName: string;
  role: UserRole;
  isPrincipalAdmin?: boolean;
}
