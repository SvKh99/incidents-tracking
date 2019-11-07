import { EnumUserActions, UserActions } from '../actions/user.actions';
import { initialUserState, UserState } from '../state/user.state';

export const userReducers = (
  state = initialUserState,
  action: UserActions
): UserState => {
  switch (action.type) {
    case EnumUserActions.GetUsersSuccess: {
      return {
        ...state,
        users: action.users,
      };
    }
    case EnumUserActions.AddUserSuccess: {
      return {
        ...state,
        users: action.users,
        message: action.message
      };
    }
    default:
      return state;
  }
};
