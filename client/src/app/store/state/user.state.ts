import { User } from '../../models/user.interface';

export interface UserState {
  users: User[];
}

export const initialUserState: UserState = {
  users: undefined,
};
