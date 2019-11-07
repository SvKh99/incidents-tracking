import { RouterReducerState} from '@ngrx/router-store';

import { UserState, initialUserState} from './user.state';
import { IncidentState, initialIncidentState} from './incident.state';

export interface AppState {
  router: RouterReducerState;
  usersState: UserState;
  incidentsState: IncidentState;
}

export const initialAppState: AppState = {
  router: undefined,
  usersState: initialUserState,
  incidentsState: initialIncidentState
};

export function getInitialState(): AppState {
  return initialAppState;
}
