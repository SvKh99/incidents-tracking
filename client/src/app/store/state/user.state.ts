import { User } from '../../models/user.interface';

export interface UserState {
  users: User[];
  message: string;
}

export const initialUserState: UserState = {
  users: undefined,
  message: undefined
};
