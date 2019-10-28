import { RouterReducerState} from '@ngrx/router-store';

import { UserState, initialUserState} from './user.state';

export interface AppState {
  router: RouterReducerState;
  users: UserState;
}

export const initialAppState: AppState = {
  router: undefined,
  users: initialUserState,
};

export function getInitialState(): AppState {
  return initialAppState;
}
