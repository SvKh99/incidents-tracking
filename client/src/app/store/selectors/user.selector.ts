import { createSelector } from '@ngrx/store';

import { AppState } from '../state/app.state';
import { UserState } from '../state/user.state';

const selectUsers = (state: AppState) => {
  return state.usersState;
};

export const selectUserList = createSelector(
  selectUsers,
  (state: UserState) => {
    if (state.message) {
      alert(state.message);
    }
    return state.users;
  }
);
